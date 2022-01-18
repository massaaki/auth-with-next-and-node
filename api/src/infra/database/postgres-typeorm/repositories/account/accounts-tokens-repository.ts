import { getRepository, Repository } from "typeorm";

import { AccountsTokens } from "../../entities/accounts-tokens";

export class AccountsTokensRepository {
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
}
