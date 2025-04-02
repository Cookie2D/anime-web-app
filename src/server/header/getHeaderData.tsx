import { supabase } from "@/lib/supabase";
import {
  AnimeCategoriesResponse,
  AnimeStatusResponse,
} from "@/types/anime/types.types";

interface HeaderLinks {
  status: AnimeStatusResponse[];
  categories: AnimeCategoriesResponse[];
}

export async function getHeaderData(): Promise<HeaderLinks> {
  const { data: status = [] } = await supabase.from("anime_statuses").select();
  const { data: categories = [] } = await supabase
    .from("anime_categories")
    .select("slug");

  return {
    status: status ?? [],
    categories: categories ?? [],
  };
}
