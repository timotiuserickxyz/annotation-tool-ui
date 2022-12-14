import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

export interface ResultItem {
  created_at: string;
  dataset_name: string;
  id: number;
  max_models: number;
  name: string;
  num_of_models: number;
  page: number;
  query: string;
  retrieved_modesl: number;
  status: string;
}
type Data = {
  results: ResultItem[];
} & ResponseStatus;

export function getResults(): Response<Data> {
  const { data, error } = useSWR<Data, ResponseError>(
    getAPIUrl('result', 'getResults'),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
