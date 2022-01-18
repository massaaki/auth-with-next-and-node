import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Account } from "./account";

@Entity("accounts_tokens")
class AccountsTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { AccountsTokens };
