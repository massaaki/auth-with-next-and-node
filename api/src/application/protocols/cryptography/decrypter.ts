type DecrypterPayloadType = {
  email: string;
};

export interface IDecrypter {
  decrypt: (value: string) => Promise<DecrypterPayloadType>;
}
