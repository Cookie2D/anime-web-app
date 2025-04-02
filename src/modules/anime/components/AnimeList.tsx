import { getAnimeList } from "@/server/anime/getAnimeList";
import AnimeListItem from "./AnimeListItem";
import { FC } from "react";

interface Props {
  query?: string;
  currentPage?: number;
}

const AnimeList: FC<Props> = async ({ currentPage, query }) => {
  const { data } = await getAnimeList({ page: currentPage, query: query });

  return (
    <div className="grid grid-cols-5 gap-3">
      {data?.map((anime) => (
        <AnimeListItem key={anime.id} {...anime} />
      ))}
    </div>
  );
};

export default AnimeList;
