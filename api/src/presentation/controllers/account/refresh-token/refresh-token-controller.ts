import { IRenewRefreshToken } from "@/domain/usecases/account/renew-refresh-token";
import { IController } from "@/presentation/protocols/controller";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols/http";

export class RefreshTokenController implements IController {
  constructor(private readonly renewRefreshToken: IRenewRefreshToken) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      console.log("RefreshTokenController: 1");
      const { refresh_token } = httpRequest.body;
      console.log("refresh_token", refresh_token);
      const response = await this.renewRefreshToken.renew(refresh_token);
      console.log("RefreshTokenController: 2");
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
