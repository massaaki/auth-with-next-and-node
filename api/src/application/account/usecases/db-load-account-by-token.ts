// import { ILoadAccountByTokenRepository } from "@/application/protocols/account/load-account-by-token-repository";
import { ILoadAccountByEmailRepository } from "@/application/protocols/account/load-account-by-email-repository";
import { IDecrypter } from "@/application/protocols/cryptography/decrypter";
import { IAccount } from "@/domain/entities/account";
import { ILoadAccountByToken } from "@/domain/usecases/account/load-account-by-token";

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly decrypter: IDecrypter
  ) {}

  async load(accessToken: string): Promise<IAccount> {
    const response = await this.decrypter.decrypt(accessToken);
    if (response) {
      const { email } = response;
      const account = await this.loadAccountByEmailRepository.loadByEmail(
        email
      );
      if (account) {
        return account;
      }
    }

    return null;
  }
}
