import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Params {
  ids: number[];
}
type Data = {} & ResponseStatus;

export async function deleteResults(params: Params): Promise<Response<Data>> {
  const { data, error } = await post(getAPIUrl('result', 'deleteResults'), {
    params,
  });

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
