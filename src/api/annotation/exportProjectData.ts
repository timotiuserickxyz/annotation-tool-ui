import { fetcher } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function exportProjectData(param: string): Promise<Response<Result>> {
  const { data, error } = await fetcher(getAPIUrl('annotation', 'exportProjectData', {projectName: param}));

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
