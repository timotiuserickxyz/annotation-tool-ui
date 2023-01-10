import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface WavFile {
    windows: string;
    name: string;
    path: string;
    updated_at: string;
  }
  type WavFileList = {
    files: WavFile[];
  } & ResponseStatus;

export function getWavFileList(param1: string): Response<WavFileList> {
  const { data, error } = useSWR<WavFileList, ResponseError>(
    param1 ? getAPIUrl('annotation', 'getWavFileList', {folderName: param1}) : null,
    fetcher
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
