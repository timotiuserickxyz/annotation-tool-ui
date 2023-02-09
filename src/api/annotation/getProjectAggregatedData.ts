import useSWR from 'swr';
import { fetcher } from '../core';
import { Response, ResponseError, ResponseStatus } from '../types/base';
import { getAPIUrl } from '../../utils/path';

interface CategorizedLabel {
  annotator: string;
  label: string;
}
interface AggregatedData {
  agreement_level: number;
  channel: number;
  file_name: string;
  sequence_number: number;
  final_label: number;
  label: CategorizedLabel[];
}
interface StatisticAgreementLevel {
  maximum: number;
  minimum: number;
  mode: number;
  std: number;
  average: number;
}
type ProjectAggregatedData = {
  project_name: string;
  threshold_agreement_level: number;
  last_updated_at: string;
  statistic_agreement_label: StatisticAgreementLevel;
  data: AggregatedData[];
} & ResponseStatus;

export function getProjectAggregatedData(param1: string, param2: string): Response<ProjectAggregatedData> {
  const { data, error } = useSWR<ProjectAggregatedData, ResponseError>(
    param1 ? (getAPIUrl('annotation', 'getProjectAggregatedDataList', {projectName: param1}) + (param2 ? ('?threshold_agreement_level=' + param2) : '')) : null,
    fetcher
  );

  return {
    data: data ?? null,
    error: error ?? null,
    loading: !error && !data,
  };
}
