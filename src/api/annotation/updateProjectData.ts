import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type ProjectData = {
  record_id: number;
  sequence_number: number;
  file_name: string;
  channel: number;
  label: string;
  status: string;
  comment: string;
} & ResponseStatus;

export async function updateProjectData(param1: string, param2: number, params: any[]): Promise<Response<ProjectData>> {
  const { data, error } = await post(getAPIUrl('annotation', 'updateProjectData', {projectName: param1, recordId: param2}), {
    params
  });
  
  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}