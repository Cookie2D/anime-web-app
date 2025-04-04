import { supabase } from "@/lib/supabase";
import { AnimeItem } from "@/types/anime";
import Image from "next/image";
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

  return (
    <Image
      alt={name}
      src={imageUrl}
      className={className}
      fill
      style={{ objectFit: "cover" }} // ✅ Modern way to apply object-fit
      sizes="230px"
    />
  );
};
export default AnimeImage;
