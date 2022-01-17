import { IAccount } from "@/domain/entities/account";

export type CreateAccountType = {
  name: string;
  email: string;
  password: string;
};

export interface ICreateAccount {
  create: (account: CreateAccountType) => Promise<IAccount>;
}
