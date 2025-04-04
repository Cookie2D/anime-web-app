import { getAnimeList } from "@/server/anime/getAnimeList";
import AnimeListItem from "./AnimeListItem";
import { FC } from "react";
import { AnimeListQuery } from "@/types/anime";

const AnimeList: FC<AnimeListQuery> = async (searchParams) => {
  const { data } = await getAnimeList(searchParams);

  return (
    <div className="grid grid-cols-5 gap-3">
      {data?.map((anime) => (
        <AnimeListItem key={anime.id} {...anime} />
      ))}
    </div>
  );
};

export default AnimeList;
