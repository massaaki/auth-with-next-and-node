import { IAccount } from "@/domain/entities/account";
import { CreateAccountType } from "@/domain/usecases/account/create-account";

export interface ICreateAccountRepository {
  create(account: CreateAccountType): Promise<IAccount>;
}
