import { NextPage } from "next";
import AnimeList from "../../modules/anime/components/AnimeList";
import { Suspense } from "react";
import AnimeListSkeleton from "@/modules/anime/components/AnimeListSkeleton";
import Search from "@/components/ui/Search/Search";
import AnimeListPagination from "@/modules/anime/components/AnimeListPagination";
import PaginationLoader from "@/components/ui/Pagination/PaginationLoader";

interface Props {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    category?: string;
  }>;
}

const About: NextPage<Props> = async (props) => {
  const searchParams = await props.searchParams;
  //const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <div>
        <Search placeholder="Search anime..." />
      </div>
      <div className="my-8">
        <Suspense key={category + currentPage} fallback={<AnimeListSkeleton />}>
          <AnimeList {...searchParams} currentPage={currentPage} />
        </Suspense>
      </div>
      <div>
        <Suspense key={category + currentPage} fallback={<PaginationLoader />}>
          <AnimeListPagination category={category} />
        </Suspense>
      </div>
    </>
  );
};

export default About;
