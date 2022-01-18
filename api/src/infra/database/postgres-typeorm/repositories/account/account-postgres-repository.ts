import { getRepository, Repository } from "typeorm";

import { ICreateAccountRepository } from "@/application/protocols/account/create-account-repository";
import { ILoadAccountByEmailRepository } from "@/application/protocols/account/load-account-by-email-repository";
import { IAccount } from "@/domain/entities/account";
import { CreateAccountType } from "@/domain/usecases/account/create-account";

import { Account } from "../../entities/account";

export class AccountPostgresRepository
  // eslint-disable-next-line prettier/prettier
  implements ICreateAccountRepository, ILoadAccountByEmailRepository {
  private accountRepository: Repository<Account>;

  // constructor() {
  //   this.accountRepository = getRepository(Account);
  // }

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

  async loadByEmail(email: string): Promise<IAccount> {
    this.accountRepository = getRepository(Account);
    const response = await this.accountRepository.findOne({
      where: { email },
    });

    return {
      id: response.id,
      email: response.email,
      name: response.name,
      password: response.password,
    };
  }
}
