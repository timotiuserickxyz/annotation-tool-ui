import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type RawFileData = {
  LineId: number;
  FileName: string;
  Sequence_number: number;
  Primal_emotion: number;
  Primal_emotion_value: number;
  Calmness_value: number;
  Anger_value: number;
  Joy_value: number;
  Sadness_value: number;
  Energy_Point: number;
  Time: string;
  Starting_time_of_the_talk: string;
  End_time_of_the_talk: string;
  Channel: number;
  Status: string;
} & ResponseStatus;

export function getRawFileDataList(param1: string, param2: string): Response<RawFileData[]> {
  const { data, error } = useSWR<RawFileData[], ResponseError>(
    param1 && param2 ? getAPIUrl('annotation', 'getRawFileDataList', {folderName: param1, fileName: param2}) : null,
    fetcher
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
