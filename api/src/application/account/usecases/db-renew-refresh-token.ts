import { ICreateAccessTokenRepository } from "@/application/protocols/account/create-access-token-repository";
import { IDeleteAccountsTokensByIdRepository } from "@/application/protocols/account/delete-accounts-tokens-by-id-repository";
import { ILoadAccountsTokensByRefreshTokenRepository } from "@/application/protocols/account/load-accounts-tokens-by-refresh-token-repository";
import { IDecrypter } from "@/application/protocols/cryptography/decrypter";
import { IEncrypter } from "@/application/protocols/cryptography/encrypter";
import { ISession } from "@/domain/entities/session";
import { IRenewRefreshToken } from "@/domain/usecases/account/renew-refresh-token";

type setExpiresTimeProps = {
  ref: "day" | "minutes";
  value: number;
};

const createExpiresTime = ({ ref, value }: setExpiresTimeProps) => {
  const timeRef = ref === "minutes" ? 60000 : 6000 * 60 * 24;
  const totalTimeInMillisecondstoAdd = timeRef * value;
  const current = new Date();

  return new Date(current.getTime() + totalTimeInMillisecondstoAdd);
};

export class DbRenewRefreshToken implements IRenewRefreshToken {
  constructor(
    private readonly loadAccountsTokensByRefreshTokens: ILoadAccountsTokensByRefreshTokenRepository,
    private readonly encrypter: IEncrypter,
    private readonly decrypter: IDecrypter,
    private readonly createAccessTokenRepository: ICreateAccessTokenRepository,
    private readonly deleteAccountsTokensRepository: IDeleteAccountsTokensByIdRepository
  ) {}
  async renew(refreshToken: string): Promise<ISession> {
    const { id } = await this.decrypter.decrypt(refreshToken);

    const accountsTokens =
      await this.loadAccountsTokensByRefreshTokens.loadByRefreshToken(
        refreshToken
      );

    if (!accountsTokens) {
      throw new Error("Refresh token does not exists!");
    }

    // delete refreshtoken
    await this.deleteAccountsTokensRepository.deleteById(accountsTokens.id);

    // create access token
    const newAccessToken = await this.encrypter.encrypt(
      id,
      createExpiresTime({ ref: "minutes", value: 15 })
    );

    const refreshTokenExpiresdate = createExpiresTime({
      ref: "minutes",
      value: 60,
    });

    const newRefreshToken = await this.encrypter.encrypt(
      id,
      refreshTokenExpiresdate
    );

    // create refresh token
    await this.createAccessTokenRepository.create(
      refreshTokenExpiresdate,
      newRefreshToken,
      id
    );

    return {
      token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}
