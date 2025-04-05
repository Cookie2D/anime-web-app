import { getSingleAnime } from "@/server/anime/getSingleAnime";
import React, { FC } from "react";
import Image from "next/image";

interface Props {
  id: number;
}

const AnimeItem: FC<React.PropsWithChildren<Props>> = async ({ id }) => {
  const { name, description, year, anime_category_list } = await getSingleAnime(
    id
  );

  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">{name}</h1>
      <div className="flex gap-8 items-start">
        <div className="relative  min-h-64 min-w-64">
          <Image
            src={`/api/image/anime/covers/cover_${id}.jpg`}
            style={{ objectFit: "scale-down" }}
            alt={name}
            fill
          />
        </div>

        <div className=" col-span-2">
          <ul>
            <li>Рік: {year}</li>
            <li>
              Категорії:{" "}
              {anime_category_list.map((el) => el.anime_categories.slug + ", ")}
            </li>
            <li></li>
          </ul>
          <p className="text-gray-800">{description}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeItem;
