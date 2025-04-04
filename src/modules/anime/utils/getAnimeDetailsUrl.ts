import { AnimeItem } from "@/types/anime";

function slugify(text: string): string {
  return text
    .replace(/[^\wА-Яа-яієїґє\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export const getAnimeDetailsUrl = ({
  id,
  name,
}: Pick<AnimeItem, "id" | "name">) => `/anime/${id}-${slugify(name)}`;
