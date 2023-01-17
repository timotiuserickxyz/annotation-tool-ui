import { remove } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function deleteProject(param: string): Promise<Response<Result>> {
  const { data, error } = await remove(getAPIUrl('annotation', 'deleteProject', {projectName: param}));
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
