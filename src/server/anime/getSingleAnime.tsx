import { supabase } from "@/lib/supabase";
import { AnimeItem } from "@/types/anime";

export async function getSingleAnime(id: number): Promise<AnimeItem> {
  "use server";
  try {
    const { data, error } = await supabase
      .from("anime_list")
      .select(
        `
        id, name, year, description,
        anime_category_list!inner(
          category_id,
          anime_categories!inner(id, slug)
        )
      `
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Error fetching anime:", error);
      throw new Error("Error fetching anime");
    }

    return {
      ...data,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching anime");
  }
}
