import Player from "@/components/ui/Player/Player";
import { getAnimePlayerData } from "@/server/anime/getAnimePlayerData";
import { FC } from "react";

interface Props {
  id: string;
}
const AnimePlayer: FC<Props> = async ({ id }) => {
  const data = await getAnimePlayerData(id);
  console.log(data);
  return (
    <div className="max-w-2xl mx-auto mx-a shadow-gray-300 shadow">
      <Player
        poster=""
        sources={[
          {
            src: "https://s1.mooncdn.online/Hokaido/28833-1-1-UkraineFastDUB.webm",
            type: "video/webm",
          },
        ]}
      />
    </div>
  );
};

export default AnimePlayer;
