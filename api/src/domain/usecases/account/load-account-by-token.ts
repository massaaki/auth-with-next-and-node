import { IAccount } from "../../entities/account";

export interface ILoadAccountByToken {
  load: (accessToken: string) => Promise<IAccount>;
}
