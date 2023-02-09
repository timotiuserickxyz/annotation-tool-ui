import { Response } from './types/base';
import router from 'next/router';

interface RequestInitExtend extends RequestInit {
  params?: {
    [key: string]: any;
  };
  ignoreContentType?: boolean;
}

// TODO 環境変数
export const API_URL = 'http://20.27.33.74:5042/api/v0';
export const AUTH_URL = 'https://employeeauthwebapijpdevl01.azurewebsites.net';

export const fetcher = async <T = any>(
  path: string,
  init?: RequestInitExtend,
): Promise<T> => {
  const query = new URLSearchParams(init?.params);
  const headers: HeadersInit = {
    'Authorization': 'Bearer ' + (localStorage.getItem('access_token') ?? ''),
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

  const err = res.statusText;
  if (err == 'Unauthorized')
  {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event("storage"));
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
    'Authorization': 'Bearer ' + (localStorage.getItem('access_token') ?? ''),
    ...(init?.ignoreContentType ? {} : { 'Content-Type': 'application/json' }),
    ...init?.headers,
  };
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    method: init?.method ?? 'POST',
    body,
  });

  if (res.ok) {
    const text = await res.text();

    return {
      data: text ? JSON.parse(text) : {},
      error: null,
      loading: false,
    };
  }

  const err = res.statusText;
  if (err == 'Unauthorized')
  {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event("storage"));
  }

  return {
    data: null,
    error: res.statusText,
    loading: false,
  };
};

export const put = async (
  path: string,
  init?: RequestInitExtend,
): Promise<Response<any>> => {
  const body = init?.body ?? JSON.stringify(init?.params);
  const headers: HeadersInit = {
    'Authorization': 'Bearer ' + (localStorage.getItem('access_token') ?? ''),
    ...{ 'Content-Type': 'application/json' },
    ...init?.headers,
  };
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    method: init?.method ?? 'PUT',
    body,
  });

  if (res.ok) {
    const text = await res.text();

    return {
      data: text ? JSON.parse(text) : {},
      error: null,
      loading: false,
    };
  }

  const err = res.statusText;
  if (err == 'Unauthorized')
  {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event("storage"));
  }

  return {
    data: null,
    error: res.statusText,
    loading: false,
  };
};

export const remove = async (
  path: string,
  init?: RequestInitExtend,
): Promise<Response<any>> => {
  const body = init?.body ?? JSON.stringify(init?.params);
  const headers: HeadersInit = {
    'Authorization': 'Bearer ' + (localStorage.getItem('access_token') ?? ''),
    ...{ 'Content-Type': 'application/json' },
    ...init?.headers,
  };
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    method: init?.method ?? 'DELETE',
    body,
  });

  if (res.ok) {
    const text = await res.text();

    return {
      data: text ? JSON.parse(text) : {},
      error: null,
      loading: false,
    };
  }

  const err = res.statusText;
  if (err == 'Unauthorized')
  {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event("storage"));
  }

  return {
    data: null,
    error: res.statusText,
    loading: false,
  };
};

export const postExternal = async (
  path: string,
  init?: RequestInitExtend,
): Promise<Response<any>> => {
  const body = init?.body ?? JSON.stringify(init?.params);
  const headers: HeadersInit = {
    ...(init?.ignoreContentType ? {} : { 'Content-Type': 'application/json' }),
    ...init?.headers,
  };
  const res = await fetch(`${AUTH_URL}${path}`, {
    ...init,
    headers,
    method: init?.method ?? 'POST',
    body,
  });

  if (res.ok) {
    const text = await res.text();

    return {
      data: text ? JSON.parse(text) : {},
      error: null,
      loading: false,
    };
  }

  const err = res.statusText;
  if (err == 'Unauthorized')
  {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event("storage"));
  }

  return {
    data: null,
    error: res.statusText,
    loading: false,
  };
};
