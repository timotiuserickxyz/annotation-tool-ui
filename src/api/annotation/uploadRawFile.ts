import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function uploadRawFile(param1: string, file: File): Promise<Response<Result>> {
  const body = new FormData();
  body.append('file', file);

  const { data, error } = await post(getAPIUrl('annotation', 'uploadRawFile', {folderName: param1}), {
    ignoreContentType: true,
    body
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
