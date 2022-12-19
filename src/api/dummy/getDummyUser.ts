import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Path {
  userId: number;
}
interface DummyCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
type DummyUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: DummyCompany;
} & ResponseStatus;

export function getDummyUser(userId: number): Response<DummyUser> {
  const { data, error } = useSWR<DummyUser, ResponseError>(
    getAPIUrl('dummy', 'getDummyUser', { userId }),
    fetcher,
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
