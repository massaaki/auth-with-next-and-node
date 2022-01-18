export interface IDeleteRefreshToken {
  delete(id: string): Promise<void>;
}
