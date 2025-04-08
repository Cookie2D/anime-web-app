"use client";

import PlayerFrame from "@/components/ui/Player/PlayerFrame";
import PlayerNavigation from "@/components/ui/Player/PlayerNavigation";
import {
  PlayerNavigationCategory,
  PlayerNavigationItem,
} from "@/components/ui/Player/types/Player.types";
import { AnimeProductions } from "@/server/anime/getAnimePlayerData";
import { FC, useLayoutEffect, useState } from "react";

interface Props {
  data: AnimeProductions[];
}

const AnimePlayer: FC<Props> = ({ data }) => {
  const [categories, setCategories] = useState<PlayerNavigationCategory[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<PlayerNavigationItem>();
  useLayoutEffect(() => {
    const categories = data
      .map((category) => ({
        title: category.title,
        items: category.anime_sources.map((item) => ({
          src: item.url,
          label: item.label,
          index: item.episode,
        })),
      }))
      .sort((a, b) => b.items.length - a.items.length);

    const mostItemsCategory = categories[0];

    setCategories(categories);
    if (mostItemsCategory.items?.[0]) {
      setCurrentEpisode(mostItemsCategory.items[0]);
    }
  }, [data]);

  if (!currentEpisode) return null; // fallback if no episode exists

  return (
    <div className="max-w-2xl mx-auto shadow shadow-gray-300">
      <PlayerFrame src={currentEpisode.src} />
      <PlayerNavigation
        data={categories}
        currentItem={currentEpisode}
        setCurrentItem={setCurrentEpisode}
      />
    </div>
  );
};

export default AnimePlayer;
