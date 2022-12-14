import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Path {
  datasetId: string;
}
interface Csv {
  name: string;
  label: string;
  group: string;
}
type Data = {
  id: number;
  name: string;
  split_groups: string[];
  source_dir: string;
  labels: string[];
  columns: string[];
  csvs: Csv[];
  num_of_labels: number;
  num_of_columns: number;
  num_of_csvs: number;
} & ResponseStatus;

export function getDataset(path: Path): Response<Data> {
  const { data, error } = useSWR<Data, ResponseError>(
    getAPIUrl('dataset', 'getDataset', path),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
