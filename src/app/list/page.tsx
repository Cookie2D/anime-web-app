import { NextPage } from "next";
import { AnimeList } from "../../modules/list/components/AnimeList";
import { Suspense } from "react";
import AnimeListSkeleton from "@/modules/list/components/AnimeListSkeleton";
import Search from "@/components/ui/Search/Search";
import { getAnimeListCount } from "@/server/list/getAnimeListCount";
import { Pagination } from "@/components/ui/Pagination/Pagination";

interface Props {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

const About: NextPage<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalCount = await getAnimeListCount({ query });
  const limit = 10;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <div>
        <Search placeholder="Search anime..." />
      </div>
      <Suspense key={query + currentPage} fallback={<AnimeListSkeleton />}>
        <AnimeList query={query} currentPage={currentPage} />
      </Suspense>
      <div>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default About;
