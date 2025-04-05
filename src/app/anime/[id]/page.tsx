import AnimeItem from "@/modules/anime/components/AnimeItem";
import React, { FC, Suspense } from "react";
import Link from "next/link";
import AnimePlayer from "@/modules/anime/components/AnimePlayer";

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

      <Suspense key={"player" + id} fallback={"player loading"}>
        <div className="my-8">
          <AnimePlayer id={id} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
