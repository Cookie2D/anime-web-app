import { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  baseFetchGet,
  baseFetchPatch,
  baseFetchPost,
  baseFetchPut,
  baseFetchRemove,
  baseFetchUpload,
  FetchContextType,
} from './useBaseFetch';

// self domain
const API_URL = '';

export const backendFetchGet = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  params?: any
) => baseFetchGet(token, language, `${API_URL}${url}`, params);

export const backendFetchPost = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any
) => baseFetchPost(token, language, `${API_URL}${url}`, data, params);

export const backendFetchPut = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any
) => baseFetchPut(token, language, `${API_URL}${url}`, data, params);

export const backendFetchPatch = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any
) => baseFetchPatch(token, language, `${API_URL}${url}`, data, params);

export const backendFetchRemove = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  params?: any
) => baseFetchRemove(token, language, `${API_URL}${url}`, params);

export const backendFetchUpload = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any,
  multiple?: boolean
) => baseFetchUpload(token, language, `${API_URL}${url}`, data, params, multiple);

const useBackendFetch = (): FetchContextType => {
  const token = null;
  const router = useRouter();

  const get = useCallback(
    async (url: string, params?: any) => backendFetchGet(token, router.locale, url, params),
    [router, token]
  );

  const post = useCallback(
    async (url: string, data?: any, params?: any) =>
      backendFetchPost(token, router.locale, url, data, params),
    [router, token]
  );

  const put = useCallback(
    async (url: string, data?: any, params?: any) =>
      backendFetchPut(token, router.locale, url, data, params),
    [router, token]
  );

  const patch = useCallback(
    async (url: string, data?: any, params?: any) =>
      backendFetchPatch(token, router.locale, url, data, params),
    [router, token]
  );

  const remove = useCallback(
    async (url: string, params?: any) => backendFetchRemove(token, router.locale, url, params),
    [router, token]
  );

  const upload = useCallback(
    async (url: string, data?: any, params?: any, multiple?: boolean) =>
      backendFetchUpload(token, router.locale, url, data, params, multiple),
    [router, token]
  );

  return {
    get,
    post,
    put,
    patch,
    remove,
    upload,
  };
};

export default useBackendFetch;
