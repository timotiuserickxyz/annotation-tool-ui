import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface RawFile {
    windows: string;
    name: string;
    path: string;
    updated_at: string;
  }
  type RawFileList = {
    files: RawFile[];
  } & ResponseStatus;

export function getRawFileList(param1: string): Response<RawFileList> {
  const { data, error } = useSWR<RawFileList, ResponseError>(
    param1 ? getAPIUrl('annotation', 'getRawFileList', {folderName: param1}) : null,
    fetcher
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
