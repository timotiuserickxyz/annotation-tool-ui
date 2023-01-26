import { Response } from './types/base';

interface RequestInitExtend extends RequestInit {
  params?: {
    [key: string]: any;
  };
  ignoreContentType?: boolean;
}

// TODO 環境変数
export const API_URL = 'http://20.27.33.74:5042/api/v0';

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
    ...(init?.ignoreContentType ? {} : { 'Content-Type': 'application/json' }),
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

export const put = async (
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
    method: init?.method ?? 'PUT',
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

export const remove = async (
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
    method: init?.method ?? 'DELETE',
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

// TODO 環境変数
const DUMMY_API_URL = 'https://jsonplaceholder.typicode.com';

export const dummyfetcher = async <T = any>(
  path: string,
  init?: RequestInitExtend,
): Promise<T> => {
  const query = new URLSearchParams(init?.params);
  const headers: HeadersInit = {
    ...{ 'Content-Type': 'application/json' },
    ...init?.headers,
  };

  const res = await fetch(
    `${DUMMY_API_URL}${path}${init?.params ? `?${query}` : ''}`,
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
