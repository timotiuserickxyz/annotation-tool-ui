import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Path {
  sourceName: string;
}
interface Params {
  column_mode: string;
  csv_file?: string;
  dataset_name: string;
  label_mode: string;
  memo?: string;
  num_of_columns?: number;
  relative_path?: string;
}
type Data = {
  id: number;
  num_of_columns: number;
  source_dir: string;
  label_type: string;
  created_at: string;
  num_of_csvs: number;
  split_groups: string[];
  num_of_labels: number;
  csv_names: string;
  relative_path: string;
  split_ratios: number[];
  name: string;
  label_mode: string;
  split_random_seed: number;
} & ResponseStatus;

export async function createDataset(
  path: Path,
  params: Params,
): Promise<Response<Data>> {
  const { data, error } = await post(
    getAPIUrl('dataset', 'createDataset', path),
    {
      params,
    },
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
