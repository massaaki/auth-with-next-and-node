import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware";
import { IMiddleware } from "@/presentation/protocols/middleware";

import { makeDbLoadAccountByToken } from "../account/load-account-by-token-factory";

export const makeAuthMiddleware = (): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken());
};
