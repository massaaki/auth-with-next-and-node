export interface ILoadAccountsTokensByRefreshTokenRepository {
  loadByRefreshToken: (refreshToken: string) => Promise<any>;
}
