import { IController } from "@/presentation/protocols/controller";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols/http";

export class MeController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { user } = httpRequest;
    return {
      statusCode: 200,
      body: {
        user,
      },
    };
  }
}
