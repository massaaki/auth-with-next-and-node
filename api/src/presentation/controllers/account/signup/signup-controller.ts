import { ICreateAccount } from "@/domain/usecases/account/create-account";
import { IController } from "@/presentation/protocols/controller";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols/http";

export class SignUpController implements IController {
  constructor(private readonly createAccount: ICreateAccount) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const account = await this.createAccount.create({
        name,
        email,
        password,
      });
      return {
        statusCode: 200,
        body: account,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: null,
      };
    }
  }
}
