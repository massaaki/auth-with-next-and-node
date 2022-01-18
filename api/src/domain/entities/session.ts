import { IAccount } from "./account";

export interface ISession {
  account: IAccount;
  token: string;
  refresh_token: string;
}
