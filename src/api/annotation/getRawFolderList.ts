import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface RawFolder {
    windows: string;
    name: string;
    path: string;
    updated_at: string;
  }
  type RawFolderList = {
    directories: RawFolder[];
  } & ResponseStatus;

export function getRawFolderList(): Response<RawFolderList> {
  const { data, error } = useSWR<RawFolderList, ResponseError>(
    getAPIUrl('annotation', 'getRawFolderList'),
    fetcher
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
