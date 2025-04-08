import React from "react";
import AnimePlayer from "./AnimePlayer";
import { getAnimePlayerData } from "@/server/anime/getAnimePlayerData";

interface Props {
  id: string;
}

const AnimePlayerContainer: React.FC<Props> = async ({ id }) => {
  const data = await getAnimePlayerData(id);

  return (
    <>
      {data.length ? (
        <AnimePlayer data={data ?? []} />
      ) : (
        <p className="h-48 w-full grid place-content-center text-gray-800">
          No data found
        </p>
      )}
    </>
  );
};

export default AnimePlayerContainer;
