export interface AnimeListQuery {
  page?: number;
  limit?: number;
  category?: string | null;
  search?: string;
}

export interface Anime {
  id: number;
  name: string;
  year: number;
  description: string;
  image: string;
}

export interface FetchAnimeResponse {
  data: Anime[];
  count: number;
}
