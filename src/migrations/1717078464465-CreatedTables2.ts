import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedTables21717078464465 implements MigrationInterface {
  name = 'CreatedTables21717078464465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "damage_report" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "damage_report"`);
  }
}
/*
 * This migration creates a new column named 'damage_report' in the 'users' table.
 *
 * The column is of type text and has no default value.
 *
 * The column is nullable, meaning that a value does not have to be provided when inserting a new row into the 'users' table.
 *
 * The 'up' method adds the column to the 'users' table, while the 'down' method removes the column from the 'users' table.
 */
