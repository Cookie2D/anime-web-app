import { getSingleAnime } from "@/server/anime/getSingleAnime";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  id: number;
}

const AnimeItem: FC<Props> = async ({ id }) => {
  const { name, image, description, year } = await getSingleAnime(id);

  return (
    <div className="grid grid-cols-3 h-full gap-4">
      <div className="relative w-full aspect-square">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            //layout="intrinsic"
            className="rounded-t-lg"
          />
        )}
      </div>

      <div className=" col-span-2">
        <h1 className="text-xl font-medium">{name}</h1>

        <ul>
          <li>Рік: {year}</li>
          <li>
            Категорії:{" "}
            {/*{anime_category_list.map((el) => el.anime_categories.slug + " ")}*/}
          </li>
          <li></li>
        </ul>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default AnimeItem;
