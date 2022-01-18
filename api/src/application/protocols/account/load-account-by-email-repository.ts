import { IAccount } from "@/domain/entities/account";

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<IAccount>;
}
