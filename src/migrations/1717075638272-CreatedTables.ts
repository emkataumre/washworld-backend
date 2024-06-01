import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedTables1717075638272 implements MigrationInterface {
  name = 'CreatedTables1717075638272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "newsletter_opt_in" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "newsletter_opt_in"`,
    );
  }
}
/*
 * This migration creates a new column named 'newsletter_opt_in' in the 'users' table.
 *
 * The column is of type boolean and has a default value of false.
 *
 * The column is not nullable, meaning that a value must be provided when inserting a new row into the 'users' table.
 *
 * The 'up' method adds the column to the 'users' table, while the 'down' method removes the column from the 'users' table.
 */
