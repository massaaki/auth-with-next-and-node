import bcrypt from "bcrypt";

import { IHashComparer } from "@/application/protocols/cryptography/hash-comprarer";
import { IHasher } from "@/application/protocols/cryptography/hasher";

export class BcryptAdapter implements IHasher, IHashComparer {
  async hash(value: string): Promise<string> {
    const salt = 12;
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
