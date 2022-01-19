/* eslint-disable @typescript-eslint/no-explicit-any */

type UserType = {
  id: string;
  email: string;
};

export interface IHttpRequest {
  user?: UserType;
  headers?: any;
  body?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}
