import useSWR from 'swr';
import { dummyfetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

type DummyPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
} & ResponseStatus;

export function getDummyPostList(): Response<DummyPost[]> {
  const { data, error } = useSWR<DummyPost[], ResponseError>(
    getAPIUrl('dummy', 'getDummyPostList'),
    dummyfetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
