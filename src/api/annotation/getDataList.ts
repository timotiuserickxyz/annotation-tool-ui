import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Data {
  record_id: number;
  sequence_number: number;
  file_name: string;
  channel: number;
  label: string;
  status: string;
  comment: string;
}
type DataList = {
  project_name: string;
  data: Data[];
} & ResponseStatus;

export function getDataList(projectName: string): Response<DataList> {
  const { data, error } = useSWR<DataList, ResponseError>(
    getAPIUrl('annotation', 'getDataList', {projectName}),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
