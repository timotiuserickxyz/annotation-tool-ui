import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

export interface DirectoryItem {
  name: string;
  path: string;
  windows: string;
  updated_at: string;
}
type Data = {
  directories: DirectoryItem[];
} & ResponseStatus;

export function getSources(): Response<Data> {
  const { data, error } = useSWR<Data, ResponseError>(
    getAPIUrl('dataset', 'getSources'),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
