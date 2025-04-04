import BlurImage from "@/components/ui/image/BlurImage";
import { supabase } from "@/lib/supabase";
import { AnimeItem } from "@/types/anime";
import React from "react";

interface Props extends Pick<AnimeItem, "id" | "name"> {
  className?: string;
}
const AnimeImage: React.FC<Props> = async ({ id, name, className }) => {
  const fetchImageUrl = async () => {
    const { data, error } = await supabase.storage
      .from("anime-covers")
      .createSignedUrl(`cover_${id}.jpg`, 60, {
        transform: { quality: 80 },
      });
    if (error) {
      console.error("Error fetching image:", error.message);
      return null;
    }

    return data.signedUrl;
  };

  const imageUrl = await fetchImageUrl();

  if (!imageUrl) return null;

  return <BlurImage src={imageUrl} alt={name} className={className} />;
};
export default AnimeImage;
