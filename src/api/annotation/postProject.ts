import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface LabelOption {
  label_type: string[];
  label_name: string[];
}
type Project = {
  project_name: string;
  raw_source_path: string;
  wav_source_path: string;
  chunking_type: string;
  description: string;
  label_option: LabelOption[];
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
