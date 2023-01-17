import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface LabelOption {
  label_type: string;
  label_name: string;
}
type Project = {
  project_name: string;
  raw_source_path: string;
  wav_source_path: string;
  chunking_type: string;
  description: string;
  label_option: LabelOption[];
} & ResponseStatus;

export function getProjectDetail(param: string): Response<Project> {
  const { data, error } = useSWR<Project, ResponseError>(
    param ? getAPIUrl('annotation', 'getProjectDetail', {projectName: param}) : null,
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
