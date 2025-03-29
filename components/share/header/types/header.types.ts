import { AnimeCategoriesResponse, AnimeStatusResponse } from '@/types/list/types.types';

export interface HeaderLinks {
  status: AnimeStatusResponse[];
  categories: AnimeCategoriesResponse[];
}
