interface RequestResponse<T = any> {
  statusCode: number;
  body: T;
  headers: { [index: string]: string};
}
