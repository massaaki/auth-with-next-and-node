import { getRepository, Repository } from "typeorm";

import { IDeleteAccountsTokensByIdRepository } from "@/application/protocols/account/delete-accounts-tokens-by-id-repository";
import { ILoadAccountsTokensByRefreshTokenRepository } from "@/application/protocols/account/load-accounts-tokens-by-refresh-token-repository";

import { AccountsTokens } from "../../entities/accounts-tokens";

export class AccountsTokensRepository
  // eslint-disable-next-line prettier/prettier
  implements ILoadAccountsTokensByRefreshTokenRepository, IDeleteAccountsTokensByIdRepository {
  private repository: Repository<AccountsTokens>;

  async create(
    expires_date: Date,
    refresh_token: string,
    account_id: string
  ): Promise<AccountsTokens> {
    this.repository = getRepository(AccountsTokens);

    const data = this.repository.create({
      account_id,
      expires_date,
      refresh_token,
    });

    const response = await this.repository.save(data);
    return response;
  }

  async loadByRefreshToken(refreshToken: string): Promise<any> {
    this.repository = getRepository(AccountsTokens);
    const data = await this.repository.findOne({
      where: { refresh_token: refreshToken },
    });

    return data;
  }

  async deleteById(id: string): Promise<void> {
    this.repository = getRepository(AccountsTokens);
    await this.repository.delete(id);
  }
}
