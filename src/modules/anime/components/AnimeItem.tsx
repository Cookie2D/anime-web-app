import { getSingleAnime } from "@/server/anime/getSingleAnime";
import React, { FC } from "react";
import AnimeImage from "./AnimeImage";

interface Props {
  id: number;
}

const AnimeItem: FC<Props> = async ({ id }) => {
  const { name, description, year } = await getSingleAnime(id);

  return (
    <div className="grid grid-cols-3 h-full gap-4">
      <div className="relative aspect-square size-96">
        <AnimeImage id={id} name={name} className="rounded-t-lg" />
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
