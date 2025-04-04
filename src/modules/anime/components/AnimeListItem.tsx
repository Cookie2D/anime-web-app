import { AnimeItem } from "@/types/anime";
import Link from "next/link";
import React, { Suspense } from "react";
import AnimeImage from "./AnimeImage";
import { PlayCircle } from "@phosphor-icons/react/dist/ssr";

export default function AnimeListItem({
  name,
  description,
  year,
  id,
}: AnimeItem) {
  return (
    <div className="border-4 border-transparent rounded-xl hover:border-violet-500 transition-colors ease-out group">
      <Link
        href={`/anime/${id}-${name}`}
        className="block rounded-lg shadow-sm  h-full bg-gray-300 group-hover:opacity-80 transition-opacity ease-out duration-500"
      >
        <div className="relative w-full aspect-square">
          <PlayCircle className="fill-transparent group-hover:fill-violet-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-colors ease-out duration-300" />
          <Suspense key={id + name} fallback={<div />}>
            <AnimeImage
              id={id}
              name={name}
              className="rounded-t-lg object-cover"
            />
          </Suspense>
          <span className="absolute z-10 left-0 bottom-2  text-sm font-medium me-2 px-2.5 py-0.5 rounded-r-sm bg-blue-900 text-blue-300">
            {year}
          </span>
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight line-clamp-2">
            {name}
          </h5>
          <p className="font-normal text-gray-800 text-ellipsis line-clamp-3">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
