import { remove } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function deleteProjectData(param: string, params: any): Promise<Response<Result>> {
  const { data, error } = await remove(getAPIUrl('annotation', 'deleteProjectData', {projectName: param}), {
    params
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
