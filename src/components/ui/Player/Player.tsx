"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./videojs-theme.css";
import Player from "video.js/dist/types/player";

interface AnimePlayerProps {
  poster: string;
  sources?: {
    src: string;
    type: string;
  }[];
}

const PlayerComponent: React.FC<AnimePlayerProps> = ({ sources, poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
        poster: poster,
        sources: sources,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [mounted, sources, poster]);

  if (!mounted) return null; // Avoid rendering before hydration

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-theme" />
    </div>
  );
};

export default PlayerComponent;
