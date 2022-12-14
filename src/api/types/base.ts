export type Error = any;

export interface Response<TData> {
  data: TData | null;
  error: Error | null;
  loading: Boolean;
}

export interface ResponseError {
  code: number;
  message: string;
}

export interface ResponseStatus {
  status: string;
  error?: ResponseError;
}
