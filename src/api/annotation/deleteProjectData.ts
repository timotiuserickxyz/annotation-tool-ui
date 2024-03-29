import { remove } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function deleteProjectData(param1: string, param2: number): Promise<Response<Result>> {
  const { data, error } = await remove(getAPIUrl('annotation', 'deleteProjectData', {projectName: param1}) + '?record_id=' + param2);
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
