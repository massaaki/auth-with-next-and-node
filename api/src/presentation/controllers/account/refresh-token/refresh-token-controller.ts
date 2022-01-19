import { IRenewRefreshToken } from "@/domain/usecases/account/renew-refresh-token";
import { IController } from "@/presentation/protocols/controller";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols/http";

export class RefreshTokenController implements IController {
  constructor(private readonly renewRefreshToken: IRenewRefreshToken) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { refresh_token } = httpRequest.body;
      const response = await this.renewRefreshToken.renew(refresh_token);
      return {
        statusCode: 200,
        body: response,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error(err),
      };
    }
  }
}
