/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateAccessTokenRepository {
  create(
    expires_date: Date,
    refresh_token: string,
    account_id: string
  ): Promise<any>;
}
