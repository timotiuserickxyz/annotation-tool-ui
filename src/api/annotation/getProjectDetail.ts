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
type Project = {
  project_name: string;
  label_option: LabelOption;
  source_path: SourcePath;
} & ResponseStatus;

export function getProjectDetail(projectName: string): Response<Project> {
  const { data, error } = useSWR<Project, ResponseError>(
    projectName ? getAPIUrl('annotation', 'getProjectDetail', {projectName}) : null,
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
