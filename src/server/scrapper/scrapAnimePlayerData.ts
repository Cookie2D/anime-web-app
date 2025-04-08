export const runtime = "nodejs"; // instead of "edge"

import { load } from "cheerio";
import { AnimeProductions } from "../anime/getAnimePlayerData";
import { fetchFullyRenderedPage } from "./fetchFullyRenderedPage";

export const scrapAnimePlayerData = async (url: string) => {
  const content = await fetchFullyRenderedPage(url);
  const $ = load(content);

  const details = $(".story_c_r").text();
  const production = extractInfo("Студія", details);
  const trailerUrl = $("a.rollover").attr("href");

  const videoData = [];
  const productions: Record<string, AnimeProductions> = {};
  const types: { label: string; id: string }[] = [];
  let playlistItemIndex = 0;

  $(".playlists-items")
    .eq(playlistItemIndex)
    .find("li[data-id]")
    .each((i, element) => {
      const id = $(element).attr("data-id");
      const label = $(element).text().trim();
      if (!id) return;
      types.push({
        label,
        id,
      });
    });
  console.log(production, trailerUrl); // push this to the anime list if not exist;

  const SOUNDED_NAME = "ОЗВУЧЕННЯ".toLowerCase();
  const SoundedId = types.find(
    (el) => el.label.toLowerCase() === SOUNDED_NAME
  )?.id;

  if (!SoundedId) {
    playlistItemIndex = 0;
  } else {
    playlistItemIndex = 1;
  }

  $(".playlists-items")
    .eq(playlistItemIndex)
    .find("li[data-id]")
    .each((i, element) => {
      const dataId = $(element).attr("data-id");
      const title = $(element).text().trim();
      if (!dataId || (SoundedId && !dataId?.startsWith(SoundedId))) return;
      productions[dataId] = {
        title,
        anime_sources: [],
      };
    });

  playlistItemIndex = 2;
  $(".playlists-videos li[data-id]").each((i, element) => {
    if (!element) {
      return;
    }
    const videoId = $(element).attr("data-id"); // e.g. "0_0_0_0"
    const videoUrl = $(element).attr("data-file");

    if (!videoUrl) {
      return;
    }
    const label = $(element).text().trim();

    const productionId = videoId?.split("_").slice(0, 3).join("_"); // Extract "0_0_0" part

    if (productionId && productions[productionId]) {
      productions[productionId].anime_sources.push({
        label,
        url: videoUrl,
        episode: i + 1,
      });
    }
  });

  for (const productionId in productions) {
    videoData.push(productions[productionId]);
  }

  const filteredData = videoData.filter((el) => el.anime_sources.length > 0);

  return filteredData;
};

function extractInfo(label: string, text: string) {
  const regex = new RegExp(`${label}:\\s*(.*)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}
