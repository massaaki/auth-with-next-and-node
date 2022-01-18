/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountsTokens1642466453646 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "accounts_tokens",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "account_id",
                        type: "uuid",
                    },
                    {
                        name: "refresh_token",
                        type: "varchar",
                    },
                    {
                        name: "expires_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKAccountToken",
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                        columnNames: ["account_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accounts_tokens");
    }

}
