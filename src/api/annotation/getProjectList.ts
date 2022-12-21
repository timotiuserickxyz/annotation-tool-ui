import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface SourcePath {
  raw_source_path: string;
  wav_source_path: string;
}
interface LabelOption {
  label_option: string[];
}
interface Project {
  project_name: string;
  label_option: LabelOption;
  source_path: SourcePath;
}
type ProjectList = {
  configs: Project[];
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
