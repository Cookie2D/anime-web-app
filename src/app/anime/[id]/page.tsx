import AnimeItem from "@/modules/anime/components/AnimeItem";
import React, { FC, Suspense } from "react";
import Link from "next/link";

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

      <Suspense key={id} fallback={"loading"}>
        <AnimeItem id={Number(id)} />
      </Suspense>
    </div>
  );
};

export default Page;
