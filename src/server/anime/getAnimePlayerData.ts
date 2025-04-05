import { supabase } from "@/lib/supabase";
import { scrapAnimePlayerData } from "../scrapper/scrapAnimePlayerData";

export async function getAnimePlayerData(id: string): Promise<number> {
  try {
    const { data } = await supabase
      .from("anime_list")
      .select(
        `
				id,
				name,
				anime_series(
					id,
					title,
					anime_sources(
						id,
						url,
						label
					)
				)
			`
      )
      .eq("id", Number(id))
      .limit(1)
      .single();
    if (!data?.anime_series.length) {
      await scrapAnimePlayerData(Number(id));
    }
    console.log(data);
    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
