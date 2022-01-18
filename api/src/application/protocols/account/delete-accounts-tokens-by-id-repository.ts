export interface IDeleteAccountsTokensByIdRepository {
  deleteById: (id: string) => Promise<void>;
}
