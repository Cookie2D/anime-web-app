import { supabase } from "@/lib/supabase";
import { AnimeListQuery } from "@/types/anime";

export interface AnimeList {
  id: number;
  name: string;
  year: number | null;
  description: string | null;
  image: string | null;
}

export interface GetAnimeList {
  data: AnimeList[];
  count: number;
}

export async function getAnimeList(
  query?: AnimeListQuery
): Promise<GetAnimeList> {
  const { page = 1, limit = 8, category = null, search } = query ?? {};

  const offset = (Number(page) - 1) * Number(limit);

  try {
    let query = supabase
      .from("anime_list")
      .select(
        `
        id, name, year, description, image, 
        anime_category_list!inner(
          category_id, 
          anime_categories!inner(id, slug)
        )
      `,
        { count: "exact" }
      )
      .range(offset, offset + Number(limit) - 1)
      .order("id", { ascending: true });

    if (category) {
      query = query.eq("anime_category_list.anime_categories.slug", category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, count } = await query;

    if (!data) {
      return {
        data: [],
        count: 0,
      };
    }
    const animeWithUrls = await Promise.all(
      data.map(async (anime) => {
        const { data: publicUrlData } = await supabase.storage
          .from("anime-covers")
          .createSignedUrl(`cover_${anime.id}.jpg`, 60, {
            transform: { quality: 80 },
          });

        if (!publicUrlData) {
          anime.image = null;
        } else {
          anime.image = publicUrlData?.signedUrl;
        }
        return anime;
      })
    );

    return {
      data: animeWithUrls,
      count: count ?? 0,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
    };
  }
}
