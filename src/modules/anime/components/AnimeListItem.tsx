import Icon from "@/components/ui/Icon/Icon";
import { AnimeItem } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AnimeListItem({
  image,
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
          <Icon
            type="PlayCircle"
            className="fill-transparent group-hover:fill-violet-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-colors ease-out duration-300"
          />
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-t-lg object-cover"
              priority
            />
          )}
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
