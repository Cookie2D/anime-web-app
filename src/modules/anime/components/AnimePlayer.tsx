"use client";

import Player from "@/components/ui/Player/Player";

const AnimePlayer = () => {
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
