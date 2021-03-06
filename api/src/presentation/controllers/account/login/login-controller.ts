import { IAuthentication } from "@/domain/usecases/account/authentication";
import { IController } from "@/presentation/protocols/controller";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols/http";

export class LoginController implements IController {
  constructor(private readonly authentication: IAuthentication) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const response = await this.authentication.auth({
        email,
        password,
      });

      if (!response) {
        return {
          statusCode: 401,
          body: "Unauthorized",
        };
      }

      const { account, token, refresh_token } = response;
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
