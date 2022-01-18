import { ICreateAccessTokenRepository } from "@/application/protocols/account/create-access-token-repository";
import { ILoadAccountByEmailRepository } from "@/application/protocols/account/load-account-by-email-repository";
import { IEncrypter } from "@/application/protocols/cryptography/encrypter";
import { IHashComparer } from "@/application/protocols/cryptography/hash-comprarer";
import {
  AuthenticationType,
  IAuthentication,
} from "@/domain/usecases/account/authentication";

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComprarer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly createAccessTokenRepository: ICreateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationType): Promise<string> {
    // try to find account by email
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    );

    if (account) {
      // verify if password is correcty
      const isValid = this.hashComprarer.compare(
        authentication.password,
        account.password
      );

      if (isValid) {
        // create access token
        const accessToken = await this.encrypter.encrypt(account.id);

        // create refresh token
        await this.createAccessTokenRepository.create(
          new Date(),
          accessToken,
          account.id
        );

        return accessToken;
      }
    }
    return null;
  }
}
