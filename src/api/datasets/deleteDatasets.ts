import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Params {
  ids: number[];
}
type Data = {} & ResponseStatus;

export async function deleteDatasets(params: Params): Promise<Response<Data>> {
  const { data, error } = await post(getAPIUrl('dataset', 'deleteDatasets'), {
    params,
  });

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
