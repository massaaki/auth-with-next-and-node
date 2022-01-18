type DecrypterPayloadType = {
  id: string;
};

export interface IDecrypter {
  decrypt: (value: string) => Promise<DecrypterPayloadType>;
}
