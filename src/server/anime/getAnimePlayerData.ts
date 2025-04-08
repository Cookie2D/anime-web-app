import { supabase } from "@/lib/supabase";
import { scrapAnimePlayerData } from "../scrapper/scrapAnimePlayerData";

export interface AnimeSources {
  url: string;
  label: string | null;
  episode: number;
}

export interface AnimeProductions {
  title: string | null;
  anime_sources: AnimeSources[];
}

export async function getAnimePlayerData(
  id: string
): Promise<AnimeProductions[]> {
  try {
    const { data } = await supabase
      .from("anime_list")
      .select(
        `
				id,
				origin_url,
				anime_productions(
					id,
					title,
					anime_sources(
						id,
						url,
						label,
						episode
					)
				)
			`
      )
      .eq("id", Number(id))
      .limit(1)
      .single();

    const testSource = {
      label: "1 серія",
      url: "https://ashdi.vip/vod/159558?nopl",
      episode: 1,
      production_id: 14,
    };

    await supabase.from("anime_sources").insert([testSource]).select("*");

    if (!data?.anime_productions.length && data?.origin_url) {
      const animeData = (await scrapAnimePlayerData(data.origin_url)) ?? [];
      if (animeData.length) {
        await addAnimeProductions(Number(id), animeData);
      }
      return animeData;
    }

    return data?.anime_productions || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addAnimeProductions(
  animeId: number,
  data: AnimeProductions[]
) {
  const results = await Promise.allSettled(
    data.map(async (production) => {
      // Insert production
      const { data: insertedProduction, error: prodError } = await supabase
        .from("anime_productions")
        .insert({
          title: production.title,
          anime_id: animeId,
        })
        .select("id, title")
        .single();

      if (prodError || !insertedProduction) {
        console.error("Failed to insert production:", prodError);
        return null;
      }
      const sources = production.anime_sources.map((source) => ({
        ...source,
        production_id: insertedProduction.id,
      }));

      const { data: insertedSources, error: sourcesError } = await supabase
        .from("anime_sources")
        .insert(sources)
        .select("id, url, label, episode");

      if (sourcesError || !insertedSources) {
        console.error("Failed to insert sources:", sourcesError);
        return null;
      }

      return {
        id: insertedProduction.id,
        title: insertedProduction.title,
        anime_sources: insertedSources,
      };
    })
  );

  // Filter only fulfilled inserts with non-null data
  return results
    .filter(
      (res): res is PromiseFulfilledResult<never> =>
        res.status === "fulfilled" && res.value !== null
    )
    .map((res) => res.value);
}
