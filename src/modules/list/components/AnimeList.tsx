import { getAnimeList } from "@/server/list/getAnimeList";
import AnimeItem from "./AnimeItem";
import { FC } from "react";

interface Props {
  query?: string;
  currentPage?: number;
}

export const AnimeList: FC<Props> = async ({ currentPage, query }) => {
  const { data } = await getAnimeList({ page: currentPage, query: query });

  return (
    <div className="grid grid-cols-5 gap-3">
      {data?.map((anime) => (
        <AnimeItem key={anime.id} {...anime} />
      ))}
    </div>
  );
};
