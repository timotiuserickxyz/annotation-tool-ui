import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

export type Data = {} & ResponseStatus;

export function getZipOpen(): Response<Data> {
  const { data, error } = useSWR<Data, ResponseError>(
    getAPIUrl('dataset', 'getZipOpen'),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
