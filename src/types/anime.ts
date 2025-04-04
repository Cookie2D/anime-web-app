export interface AnimeListQuery {
  page?: string;
  limit?: string;
  category?: string | null;
  query?: string;
}

export interface AnimeItem {
  id: number;
  name: string;
  year: number | null;
  description: string | null;
}

export interface GetAnimeList {
  data: AnimeItem[];
}
