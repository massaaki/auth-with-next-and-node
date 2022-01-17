/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse } from "@/presentation/protocols/http";

export const success = (data?: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});
