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
type WavList = {
  files: Wav[];
} & ResponseStatus;

export function getWavList(projectName: string): Response<WavList> {
  const { data, error } = useSWR<WavList, ResponseError>(
    getAPIUrl('annotation', 'getWavList', {projectName}),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
