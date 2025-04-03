import { supabase } from "@/lib/supabase";
import { AnimeListQuery } from "@/types/anime";

export async function getAnimeListCount(
  params?: AnimeListQuery
): Promise<number> {
  const { category = null, query } = params ?? {};

  try {
    let supabase_query = supabase.from("anime_list").select(
      `
        id, name, year, description, image, 
        anime_category_list!inner(
          category_id, 
          anime_categories!inner(id, slug)
        )
      `,
      { count: "exact", head: false }
    );

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

    const { count } = await supabase_query;
    return count ?? 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
