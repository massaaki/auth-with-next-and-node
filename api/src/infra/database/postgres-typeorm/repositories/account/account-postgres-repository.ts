import { getRepository, Repository } from "typeorm";

import { ICreateAccountRepository } from "@/application/protocols/account/create-account-repository";
import { IAccount } from "@/domain/entities/account";
import { CreateAccountType } from "@/domain/usecases/account/create-account";

import { Account } from "../../entities/account";

export class AccountPostgresRepository implements ICreateAccountRepository {
  private accountRepository: Repository<Account>;

  async create(account: CreateAccountType): Promise<IAccount> {
    const { email, password, name } = account;

    this.accountRepository = getRepository(Account);

    const data = this.accountRepository.create({
      name,
      email,
      password,
    });

    const response = await this.accountRepository.save(data);

    return {
      id: response.id,
      name: response.name,
      password: response.password,
      email: response.email,
    };
  }
}
