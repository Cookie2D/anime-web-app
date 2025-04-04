import Pagination from "@/components/ui/Pagination/Pagination";
import { getAnimeListCount } from "@/server/anime/getAnimeListCount";
import { AnimeListQuery } from "@/types/anime";
import React from "react";

type Props = Omit<AnimeListQuery, "page">;
const AnimeListPagination: React.FC<Props> = async ({ category, query }) => {
  "use cache";

  const totalCount = await getAnimeListCount({ category, query });
  const limit = 10;
  const totalPages = Math.ceil(totalCount / limit);

  return <Pagination totalPages={totalPages} />;
};

export default AnimeListPagination;
