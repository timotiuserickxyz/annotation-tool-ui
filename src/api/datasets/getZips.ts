import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

export interface DirectoryItem {
  name: string;
  windows: string;
  path: string;
  updated_at: string;
}
type Data = {
  directories: DirectoryItem[];
} & ResponseStatus;

export function getZips(): Response<Data> {
  const { data, error } = useSWR<Data, ResponseError>(
    getAPIUrl('dataset', 'getZips'),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
