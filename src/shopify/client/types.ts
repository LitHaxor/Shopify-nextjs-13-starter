export type GraphqlVariables = {
  [key: string]: any;
};

export type StorefrontQueryResponse<T = any> = {
  data: T | null;
  status: number;
  errors: any;
};
