import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface WavFolder {
    windows: string;
    name: string;
    path: string;
    updated_at: string;
  }
  type WavFolderList = {
    directories: WavFolder[];
  } & ResponseStatus;

export function getWavFolderList(): Response<WavFolderList> {
  const { data, error } = useSWR<WavFolderList, ResponseError>(
    getAPIUrl('annotation', 'getWavFolderList'),
    fetcher
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
