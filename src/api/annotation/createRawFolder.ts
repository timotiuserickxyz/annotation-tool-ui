import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type Result = {
  status: string;
} & ResponseStatus;

export async function createRawFolder(param1: string): Promise<Response<Result>> {
  const params = {
    folder_name: param1
  }
  
  const { data, error } = await post(getAPIUrl('annotation', 'createRawFolder', {folderName: param1}), {
    params
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
