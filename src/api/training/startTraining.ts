import { post } from '../core';
import { Response, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface Algorithm {
  name: string;
  parameters: any;
}
interface ConfigPair {
  ctx_config_name: string;
  preprocess_config_name: string;
}
export interface Params {
  algorithms: Algorithm[];
  cache: boolean;
  config_pairs: ConfigPair[];
  dataset_name: string;
  features: string[];
}
type Data = {} & ResponseStatus;

export async function startTraining(params: Params): Promise<Response<Data>> {
  const { data, error } = await post(getAPIUrl('training', 'startTraining'), {
    params,
  });

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
