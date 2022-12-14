import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Path {
  datasetId: string;
}
interface Params {
  update_type: 'add_files' | 'remove_files' | 'label' | 'group' | 'split';
  file_name?: string;
  file_names?: string[];
  group?: string;
  label?: string;
  split?: number[];
}
type Data = {} & ResponseStatus;

export async function updateDataset(
  path: Path,
  params: Params,
): Promise<Response<Data>> {
  const { data, error } = await post(
    getAPIUrl('dataset', 'updateDataset', path),
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
