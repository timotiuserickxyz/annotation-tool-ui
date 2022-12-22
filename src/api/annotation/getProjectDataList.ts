import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface ProjectData {
  record_id: number;
  sequence_number: number;
  file_name: string;
  channel: number;
  label: string;
  status: string;
  comment: string;
}
type ProjectDataList = {
  project_name: string;
  data: ProjectData[];
} & ResponseStatus;

export function getProjectDataList(param: string): Response<ProjectDataList> {
  const { data, error } = useSWR<ProjectDataList, ResponseError>(
    param ? getAPIUrl('annotation', 'getProjectDataList', {projectName: param}) : null,
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
