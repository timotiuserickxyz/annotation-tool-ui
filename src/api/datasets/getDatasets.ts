import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

export interface DatasetItem {
  id: number;
  name: string;
  num_of_csvs: number;
  num_of_columns: number;
  num_of_labels: number;
  status: string;
  memo: string;
}
export type Data = {
  datasets: DatasetItem[];
} & ResponseStatus;

export function getDatasets(): Response<Data> {
  const { data, error } = useSWR<Data, ResponseError>(
    getAPIUrl('dataset', 'getDatasets'),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
