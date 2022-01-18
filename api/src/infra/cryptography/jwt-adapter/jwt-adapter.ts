/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

import { IDecrypter } from "@/application/protocols/cryptography/decrypter";
import { IEncrypter } from "@/application/protocols/cryptography/encrypter";

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {
    this.secret = secret;
  }

  async encrypt(value: string, expiresIn: Date): Promise<string> {
    const currentDate = new Date();
    const diffInMs = expiresIn.getTime() - currentDate.getTime();

    const accessToken = await jwt.sign({ id: value }, this.secret, {
      expiresIn: diffInMs,
    });

    return accessToken;
  }

  async decrypt(token: string): Promise<any> {
    const value: any = jwt.verify(token, this.secret);

    return value;
  }
}
