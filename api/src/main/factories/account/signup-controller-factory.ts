import { DbCreateAccount } from "@/application/account/usecases/db-create-account";
import { ICreateAccount } from "@/domain/usecases/account/create-account";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountPostgresRepository } from "@/infra/database/postgres-typeorm/repositories/account/account-postgres-repository";
import { SignUpController } from "@/presentation/controllers/account/signup/signup-controller";
import { IController } from "@/presentation/protocols/controller";

import env from "../../config/env";

const makeDbCreateAccount = (): ICreateAccount => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const bcryptAdapter = new BcryptAdapter();
  const accountPostgresRepository = new AccountPostgresRepository(jwtAdapter);
  return new DbCreateAccount(bcryptAdapter, accountPostgresRepository);
};

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbCreateAccount());
  return controller;
};
