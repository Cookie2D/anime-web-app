import { supabase } from "@/lib/supabase";
import { AnimeListQuery, GetAnimeList } from "@/types/anime";

export async function getAnimeList(
  params?: AnimeListQuery
): Promise<GetAnimeList> {
  const { page = 1, limit = 10, category = null, query } = params ?? {};

  const offset = (Number(page) - 1) * Number(limit);

  try {
    let supabase_query = supabase
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
      supabase_query = supabase_query.eq(
        "anime_category_list.anime_categories.slug",
        category
      );
    }

    if (query) {
      supabase_query = supabase_query.or(
        `name.ilike.%${query}%,description.ilike.%${query}%`
      );
    }

    const { data, count } = await supabase_query;

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
