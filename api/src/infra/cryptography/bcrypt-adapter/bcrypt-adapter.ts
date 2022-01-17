import bcrypt from "bcrypt";

import { IHasher } from "@/application/protocols/cryptography/hasher";

export class BcryptAdapter implements IHasher {
  async hash(value: string): Promise<string> {
    const salt = 12;
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }
}
