import { ICreateAccessTokenRepository } from "@/application/protocols/account/create-access-token-repository";
import { ILoadAccountByEmailRepository } from "@/application/protocols/account/load-account-by-email-repository";
import { IEncrypter } from "@/application/protocols/cryptography/encrypter";
import { IHashComparer } from "@/application/protocols/cryptography/hash-comprarer";
import { ISession } from "@/domain/entities/session";
import {
  AuthenticationType,
  IAuthentication,
} from "@/domain/usecases/account/authentication";

type setExpiresTimeProps = {
  ref: "day" | "minutes";
  value: number;
};

const createExpiresTime = ({ ref, value }: setExpiresTimeProps) => {
  const timeRef = ref === "minutes" ? 1000 * 60 : 6000 * 60 * 24;
  const totalTimeInMillisecondstoAdd = timeRef * value;
  const current = new Date();

  return new Date(current.getTime() + totalTimeInMillisecondstoAdd);
};

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComprarer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly createAccessTokenRepository: ICreateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationType): Promise<ISession> {
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
        const accessToken = await this.encrypter.encrypt(
          account.email,
          createExpiresTime({ ref: "minutes", value: 1 })
        );

        const refreshTokenExpiresdate = createExpiresTime({
          ref: "day",
          value: 1,
        });

        const refreshToken = await this.encrypter.encrypt(
          account.email,
          refreshTokenExpiresdate
        );
        // create refresh token
        await this.createAccessTokenRepository.create(
          refreshTokenExpiresdate,
          refreshToken,
          account.id
        );

        return {
          account,
          token: accessToken,
          refresh_token: refreshToken,
        };
      }
    }
    return null;
  }
}
