import { Router } from "express";

import { adaptRoute } from "../adapters/express/express-router-adapter";
import { adaptMiddleware } from "../adapters/express/express.middleware.adapter";
import { makeMeController } from "../factories/account/load-me-controller-factory";
import { makeLoginController } from "../factories/account/login-controller-factory";
import { makeRefreshTokenController } from "../factories/account/refresh-token-controller-factory";
import { makeSignUpController } from "../factories/account/signup-controller-factory";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware.factory";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/login", adaptRoute(makeLoginController()));
  router.post("/refresh-token", adaptRoute(makeRefreshTokenController()));

  const authMiddleware = adaptMiddleware(makeAuthMiddleware());

  router.get("/me", authMiddleware, adaptRoute(makeMeController()));
};
