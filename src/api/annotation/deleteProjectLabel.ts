import { remove } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function deleteProjectLabel(param1: string, params: any): Promise<Response<Result>> {
  const { data, error } = await remove(getAPIUrl('annotation', 'deleteProjectLabel', {projectName: param1}), {
    params
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
