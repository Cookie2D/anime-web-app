import Pagination from "@/components/ui/Pagination/Pagination";
import { getAnimeListCount } from "@/server/anime/getAnimeListCount";
import { AnimeListQuery } from "@/types/anime";
import React from "react";

interface Props {
  query?: Omit<AnimeListQuery, "page">;
}
const AnimeListPagination: React.FC<Props> = async ({ query }) => {
  const totalCount = await getAnimeListCount(query);
  const limit = 10;
  const totalPages = Math.ceil(totalCount / limit);

  return <Pagination totalPages={totalPages} />;
};

export default AnimeListPagination;
