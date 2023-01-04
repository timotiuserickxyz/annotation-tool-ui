import { put } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type ProjectInfo = {
  project_name: string;
  raw_source_path: string;
  wav_source_path: string;
} & ResponseStatus;

export async function putProject(param: string, params: any): Promise<Response<ProjectInfo>> {
  const { data, error } = await put(getAPIUrl('annotation', 'putProject', {projectName: param}), {
    params
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
