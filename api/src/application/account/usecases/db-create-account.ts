import { ICreateAccountRepository } from "@/application/protocols/account/create-account-repository";
import { IHasher } from "@/application/protocols/cryptography/hasher";
import { IAccount } from "@/domain/entities/account";
import {
  CreateAccountType,
  ICreateAccount,
} from "@/domain/usecases/account/create-account";

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository
  ) {}

  async create(account: CreateAccountType): Promise<IAccount> {
    const { password } = account;
    const hashedPassowrd = await this.hasher.hash(password);

    const newAccount: IAccount = { ...account, password: hashedPassowrd };
    const response = await this.createAccountRepository.create(newAccount);

    return response;
  }
}
