import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface LabelOption {
  label_type: string;
  label_name: string;
}
interface Project {
  project_name: string;
  raw_source_path: string;
  wav_source_path: string;
  chunking_type: string;
  description: string;
  label_option: LabelOption[];
}
type ProjectList = {
  projects: Project[];
} & ResponseStatus;

export function getProjectList(): Response<ProjectList> {
  const { data, error } = useSWR<ProjectList, ResponseError>(
    getAPIUrl('annotation', 'getProjectList'),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
