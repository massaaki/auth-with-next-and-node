import { Router } from "express";

import { adaptRoute } from "../adapters/express/express-router-adapter";
import { makeLoginController } from "../factories/account/login-controller-factory";
import { makeRefreshTokenController } from "../factories/account/refresh-token-controller-factory";
import { makeSignUpController } from "../factories/account/signup-controller-factory";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/login", adaptRoute(makeLoginController()));
  router.post("/refresh-token", adaptRoute(makeRefreshTokenController()));
};
