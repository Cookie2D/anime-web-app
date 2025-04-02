import { supabase } from "@/lib/supabase";
import { AnimeItem } from "@/types/anime";

export async function getSingleAnime(id: number): Promise<AnimeItem> {
  try {
    const { data, error } = await supabase
      .from("anime_list")
      .select(
        `
        id, name, year, description, image,
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

    const { data: publicUrlData } = await supabase.storage
      .from("anime-covers")
      .createSignedUrl(`cover_${data.id}.jpg`, 60, {
        transform: { quality: 100 },
      });

    return {
      ...data,
      image: publicUrlData?.signedUrl || null,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching anime");
  }
}
