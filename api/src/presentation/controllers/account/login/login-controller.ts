import { IAuthentication } from "@/domain/usecases/account/authentication";
import { IController } from "@/presentation/protocols/controller";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols/http";

export class LoginController implements IController {
  constructor(private readonly authentication: IAuthentication) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const { account, token, refresh_token } = await this.authentication.auth({
        email,
        password,
      });

      if (!account) {
        return {
          statusCode: 401,
          body: "Unauthorized",
        };
      }
      return {
        statusCode: 200,
        body: {
          account,
          token,
          refresh_token,
        },
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error(err),
      };
    }
  }
}
