import { remove } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function clearProjectData(param1: string, param2: string): Promise<Response<Result>> {
  const { data, error } = await remove(getAPIUrl('annotation', 'clearProjectData', {projectName: param1}) + '?file_name=' + param2);
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
