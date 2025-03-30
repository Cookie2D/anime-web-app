export interface AnimeListQuery {
  page?: number;
  limit?: number;
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
