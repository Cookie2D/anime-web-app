export interface AnimeStatusResponse {
  id: number;
  created_at: string;
  name_key: string;
  description_key: string;
  type: string;
}

export interface AnimeCategoriesResponse {
  slug: string;
}
