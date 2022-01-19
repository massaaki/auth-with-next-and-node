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

    const accessToken = await jwt.sign({ email: value }, this.secret, {
      expiresIn: diffInMs / 1000,
    });

    return accessToken;
  }

  async decrypt(token: string): Promise<any> {
    console.log("decrypt 1", token);
    try {
      const value: any = jwt.verify(token, this.secret);
      // console.log("decrypt 2");
      if (value) {
        // const { exp } = value;
        // const expDate = new Date((exp as number) * 1000);
        // const currentDate = new Date();
        // const expired = expDate.getTime() - currentDate.getTime() < 0;
        return value;
      }
    } catch {
      return null;
    }
    return null;
  }
}
