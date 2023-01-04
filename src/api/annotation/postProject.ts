import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface SourcePath {
  raw_source_path: string;
  wav_source_path: string;
}
interface LabelOption {
  label_option: string[];
}
type Project = {
  project_name: string;
  label_option: LabelOption;
  source_path: SourcePath;
} & ResponseStatus;

export async function postProject(params: any): Promise<Response<Project>> {
  const { data, error } = await post(getAPIUrl('annotation', 'postProject'), {
    params
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
