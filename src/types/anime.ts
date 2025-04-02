export interface AnimeListQuery {
  page?: number;
  limit?: number;
  category?: string | null;
  query?: string;
}

export interface AnimeItem {
  id: number;
  name: string;
  year: number | null;
  description: string | null;
  image: string | null;
}

export interface GetAnimeList {
  data: AnimeItem[];
  count: number;
}
