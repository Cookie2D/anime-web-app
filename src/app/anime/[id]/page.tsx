import AnimeItem from "@/modules/anime/components/AnimeItem";
import React, { FC, Suspense } from "react";
import Link from "next/link";
import AnimePlayerContainer from "@/modules/anime/components/AnimePlayerContainer";
import PlayerLoader from "@/components/ui/Player/PlayerLoader";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page: FC<Props> = async ({ params }) => {
  const [id] = (await params).id.split("-");

  return (
    <div>
      <div>
        <Link
          href="/anime"
          className="inline-block mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          ← Go Back
        </Link>
      </div>

      <Suspense key={"markdown" + id} fallback={"loading"}>
        <AnimeItem id={Number(id)} />
      </Suspense>

      <div className="max-w-2xl min-h-[443px] mx-auto mt-8">
        <Suspense key={"player" + id} fallback={<PlayerLoader />}>
          <div className="my-8">
            <AnimePlayerContainer id={id} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
