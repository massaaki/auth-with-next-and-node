/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHttpRequest {
  headers?: number;
  body?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}
