import { DbRenewRefreshToken } from "@/application/account/usecases/db-renew-refresh-token";
import { IRenewRefreshToken } from "@/domain/usecases/account/renew-refresh-token";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountPostgresRepository } from "@/infra/database/postgres-typeorm/repositories/account/account-postgres-repository";
import { AccountsTokensRepository } from "@/infra/database/postgres-typeorm/repositories/account/accounts-tokens-repository";
import { RefreshTokenController } from "@/presentation/controllers/account/refresh-token/refresh-token-controller";
import { IController } from "@/presentation/protocols/controller";

import env from "../../config/env";

const makeRefreshToken = (): IRenewRefreshToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPostgresRepository = new AccountPostgresRepository(jwtAdapter);
  const accountsTokenRepository = new AccountsTokensRepository();

  return new DbRenewRefreshToken(
    accountPostgresRepository,
    accountsTokenRepository,
    jwtAdapter,
    jwtAdapter,
    accountsTokenRepository,
    accountsTokenRepository
  );
};

export const makeRefreshTokenController = (): IController => {
  return new RefreshTokenController(makeRefreshToken());
};
