import { DbLoadAccountByToken } from "@/application/account/usecases/db-load-account-by-token";
import { ILoadAccountByToken } from "@/domain/usecases/account/load-account-by-token";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountPostgresRepository } from "@/infra/database/postgres-typeorm/repositories/account/account-postgres-repository";

import env from "../../config/env";

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPostgresRepository = new AccountPostgresRepository(jwtAdapter);

  return new DbLoadAccountByToken(accountPostgresRepository, jwtAdapter);
};
