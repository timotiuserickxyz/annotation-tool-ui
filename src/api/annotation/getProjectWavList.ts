import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Wav {
  name: string;
  path: string;
  updated_at: string;
  windows: string;
}
type ProjectWavList = {
  files: Wav[];
} & ResponseStatus;

export function getProjectWavList(param: string): Response<ProjectWavList> {
  const { data, error } = useSWR<ProjectWavList, ResponseError>(
    param ? getAPIUrl('annotation', 'getProjectWavList', {projectName: param}) : null,
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
