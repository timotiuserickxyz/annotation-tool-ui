import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function uploadWavFile(param1: string, files: FileList): Promise<Response<Result>> {
  const body = new FormData();
  
  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    body.append('file' + fileIndex, files[fileIndex]);
  }

  const { data, error } = await post(getAPIUrl('annotation', 'uploadWavFile', {folderName: param1}), {
    ignoreContentType: true,
    body
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
