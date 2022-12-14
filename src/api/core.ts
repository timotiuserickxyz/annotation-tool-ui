import { Response } from './types/base';

interface RequestInitExtend extends RequestInit {
  params?: {
    [key: string]: any;
  };
}

// TODO 環境変数
const API_URL = 'http://localhost:5042/api/v0';

export const fetcher = async <T = any>(
  path: string,
  init?: RequestInitExtend,
): Promise<T> => {
  const query = new URLSearchParams(init?.params);
  const headers: HeadersInit = {
    ...{ 'Content-Type': 'application/json' },
    ...init?.headers,
  };

  const res = await fetch(
    `${API_URL}${path}${init?.params ? `?${query}` : ''}`,
    {
      ...init,
      headers,
    },
  );

  const text = await res.text();
  const error = text ? JSON.parse(text) : {};

  if (res.ok) {
    return text ? JSON.parse(text) : {};
  }

  return Promise.reject({
    ...error,
  });
};

export const post = async (
  path: string,
  init?: RequestInitExtend,
): Promise<Response<any>> => {
  const body = init?.body ?? JSON.stringify(init?.params);
  const headers: HeadersInit = {
    ...{ 'Content-Type': 'application/json' },
    ...init?.headers,
  };
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    method: init?.method ?? 'POST',
    body,
  });

  const text = await res.text();
  const error = text ? JSON.parse(text) : {};

  if (res.ok) {
    return {
      data: text ? JSON.parse(text) : {},
      error: null,
      loading: false,
    };
  }

  return {
    data: null,
    error,
    loading: false,
  };
};
