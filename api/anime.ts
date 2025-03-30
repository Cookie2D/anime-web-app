import { useQuery } from '@tanstack/react-query';
import useBackendFetch from '@/hooks/useBackendFetch';
import { AnimeListQuery, FetchAnimeResponse } from '@/types/anime';
import { APIError } from '@/types/common';

export const QK_ANIME = '/api/anime';

export const useGetAnimeList = (params: AnimeListQuery) => {
  const fetch = useBackendFetch();

  return useQuery<FetchAnimeResponse, APIError>({
    queryKey: [QK_ANIME, params],
    queryFn: () => fetch.get(QK_ANIME, params),
  });
};
