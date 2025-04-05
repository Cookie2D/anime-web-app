import { AnimeItem } from "@/types/anime";
import Link from "next/link";
import React from "react";
import { PlayCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { getAnimeDetailsUrl } from "../utils/getAnimeDetailsUrl";

export default function AnimeListItem({
  name,
  description,
  year,
  id,
}: AnimeItem) {
  return (
    <div className="border-4 border-transparent rounded-xl hover:border-violet-500 transition-colors ease-out group">
      <Link
        href={getAnimeDetailsUrl({ id, name })}
        className="block rounded-lg shadow-sm  h-full bg-gray-300 group-hover:opacity-80 transition-opacity ease-out duration-500"
      >
        <div className="relative w-full aspect-square">
          <PlayCircle
            size={96}
            className="fill-transparent group-hover:fill-violet-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-colors ease-out duration-300"
          />
          <Image
            src={`/api/image/anime/covers/cover_${id}.jpg`}
            alt={name}
            width={230}
            height={230}
          />
          <span className="absolute z-10 left-0 bottom-2  text-sm font-medium me-2 px-2.5 py-0.5 rounded-r-sm bg-blue-900 text-blue-300">
            {year}
          </span>
        </div>

        <div className="p-5">
          <h2 className="mb-2 text-xl font-bold tracking-tight line-clamp-2">
            {name}
          </h2>
          <p className="font-normal text-gray-800 text-ellipsis line-clamp-3">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
