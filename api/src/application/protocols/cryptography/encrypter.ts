export interface IEncrypter {
  encrypt(value: string, expiresIn: Date): Promise<string>;
}
