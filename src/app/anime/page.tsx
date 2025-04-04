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

  return (
    <>
      <div>
        <Search placeholder="Search anime..." />
      </div>
      <div className="my-8">
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<AnimeListSkeleton />}
        >
          <AnimeList {...searchParams} />
        </Suspense>
      </div>
      <div>
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<PaginationLoader />}
        >
          <AnimeListPagination
            category={searchParams?.category}
            query={searchParams?.query}
          />
        </Suspense>
      </div>
    </>
  );
};

export default About;
