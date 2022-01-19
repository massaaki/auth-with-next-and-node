import { DbAuthentication } from "@/application/account/usecases/db-authentication";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountPostgresRepository } from "@/infra/database/postgres-typeorm/repositories/account/account-postgres-repository";
import { AccountsTokensRepository } from "@/infra/database/postgres-typeorm/repositories/account/accounts-tokens-repository";
import { LoginController } from "@/presentation/controllers/account/login/login-controller";
import { IController } from "@/presentation/protocols/controller";

import env from "../../config/env";

const makeDbAuthentication = (): DbAuthentication => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const bcrypterAdapter = new BcryptAdapter();

  const accountPostgresRepository = new AccountPostgresRepository(jwtAdapter);
  const accountsTokenRepository = new AccountsTokensRepository();

  return new DbAuthentication(
    accountPostgresRepository,
    bcrypterAdapter,
    jwtAdapter,
    accountsTokenRepository
  );
};

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication());
  return controller;
};
