import { ILoadAccountByToken } from "@/domain/usecases/account/load-account-by-token";

import { IHttpRequest, IHttpResponse } from "../protocols/http";
import { IMiddleware } from "../protocols/middleware";

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadAccountbyToken: ILoadAccountByToken) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const [, accessToken] = (
        httpRequest.headers?.authorization as string
      ).split(" ");
      if (accessToken) {
        const account = await this.loadAccountbyToken.load(accessToken);
        if (account) {
          // eslint-disable-next-line no-param-reassign
          return {
            statusCode: 200,
            body: account,
          };
        }
      }
      return {
        statusCode: 403,
        body: { message: "token.expired" },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {},
      };
    }
  }
}
