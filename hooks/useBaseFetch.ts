import { useCallback } from 'react';
import { useRouter } from 'next/router';
import fetch from 'cross-fetch';
import { omit } from 'lodash';
import queryString from 'query-string';
import { DEFAULT_LANGUAGE } from '@/utils/const';

export const parseError = (status: number, body: any): string => {
  const message = body.message || body.detail?.[0]?.msg || body.detail || 'Error';

  // if (status >= 500 && status !== 401 && message) {
  //   notifications.show({
  //     message,
  //     color: 'red',
  //   })
  // }
  //
  // if (status === 401 && !location.pathname.includes('login')) {
  //   destroyCookie(null, 'token', { path: '/' })
  //
  //   window.requestAnimationFrame(() => {
  //     const language = location.pathname.match(/\/.{2}\//)
  //     location.href = `${language?.[0].slice(0, 3) || ''}/login?url=${encodeURIComponent(location.pathname)}`
  //   })
  // }

  return {
    ...body,
    status,
    message,
  };
};

export const getHeaders = (
  token: string | null | undefined,
  language: string | null | undefined
): any => {
  const headers: any = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Accept-language': language || DEFAULT_LANGUAGE,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const buildQuery = (params: any) => {
  const query = queryString.stringify(params);

  return query ? `?${query}` : '';
};

export const baseFetchGet = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  params?: any
) => {
  const headers = omit(getHeaders(token, language), ['Content-Type']);

  const res = await fetch(`${url}${buildQuery(params)}`, {
    headers,
    method: 'GET',
  });

  if (!res.ok) {
    const body = await res.json();
    throw parseError(res.status, body);
  }

  return res.json();
};

export const baseFetchPost = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any
) => {
  const headers = getHeaders(token, language);

  const res = await fetch(`${url}${buildQuery(params)}`, {
    headers,
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (!res.ok) {
    const body = await res.json();
    throw parseError(res.status, body);
  }

  return res.json();
};

export const baseFetchPut = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any
) => {
  const headers = getHeaders(token, language);

  const res = await fetch(`${url}${buildQuery(params)}`, {
    headers,
    body: JSON.stringify(data),
    method: 'PUT',
  });

  if (!res.ok) {
    const body = await res.json();
    throw parseError(res.status, body);
  }

  return res.json();
};

export const baseFetchPatch = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data?: any,
  params?: any
) => {
  const headers = getHeaders(token, language);

  const res = await fetch(`${url}${buildQuery(params)}`, {
    headers,
    body: JSON.stringify(data),
    method: 'PATCH',
  });

  if (!res.ok) {
    const body = await res.json();
    throw parseError(res.status, body);
  }

  return res.json();
};

export const baseFetchRemove = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  params?: any
) => {
  const headers = getHeaders(token, language);

  const res = await fetch(`${url}${buildQuery(params)}`, {
    headers,
    method: 'DELETE',
  });

  if (!res.ok) {
    const body = await res.json();
    throw parseError(res.status, body);
  }

  return res.json();
};

export const baseFetchUpload = async (
  token: string | null | undefined,
  language: string | null | undefined,
  url: string,
  data: any,
  params?: any,
  multiple?: boolean
) => {
  const formData = new FormData();
  const headers = omit(getHeaders(token, language), ['Content-Type']);

  if (!multiple) {
    formData.append('file', data);
  } else if (Array.isArray(data)) {
    data.forEach((el) => {
      formData.append('files', el);
    });
  }

  const res = await fetch(`${url}${buildQuery(params)}`, {
    headers,
    body: formData,
    method: 'POST',
  });

  if (!res.ok) {
    const body = await res.json();
    throw parseError(res.status, body);
  }

  return res.json();
};

export type FetchContextType = {
  get: <TResult = any, TParams = any>(url: string, params?: TParams) => Promise<TResult>;
  post: <TResult = any, TData = any, TParams = any>(
    url: string,
    data?: TData,
    params?: TParams
  ) => Promise<TResult>;
  put: <TResult = any, TData = any, TParams = any>(
    url: string,
    data?: TData,
    params?: TParams
  ) => Promise<TResult>;
  patch: <TResult = any, TData = any, TParams = any>(
    url: string,
    data?: TData,
    params?: TParams
  ) => Promise<TResult>;
  remove: <TResult = any, TParams = any>(url: string, params?: TParams) => Promise<TResult>;
  upload: <TResult = any, TData = any, TParams = any>(
    url: string,
    data?: TData,
    params?: TParams,
    multiple?: boolean
  ) => Promise<TResult>;
};

const useBaseFetch = (): FetchContextType => {
  const token = null;
  const router = useRouter();

  const get = useCallback(
    async (url: string, params?: any) => baseFetchGet(token, router.locale, url, params),
    [router.locale, token]
  );

  const post = useCallback(
    async (url: string, data?: any, params?: any) =>
      baseFetchPost(token, router.locale, url, data, params),
    [router, token]
  );

  const put = useCallback(
    async (url: string, data?: any, params?: any) =>
      baseFetchPut(token, router.locale, url, data, params),
    [router, token]
  );

  const patch = useCallback(
    async (url: string, data?: any, params?: any) =>
      baseFetchPatch(token, router.locale, url, data, params),
    [router, token]
  );

  const remove = useCallback(
    async (url: string, params?: any) => baseFetchRemove(token, router.locale, url, params),
    [router, token]
  );

  const upload = useCallback(
    async (url: string, data: any, params?: any, multiple?: boolean) =>
      baseFetchUpload(token, router.locale, url, data, params, multiple),
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

export default useBaseFetch;
