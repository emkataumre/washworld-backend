import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedTables21717078464465 implements MigrationInterface {
    name = 'CreatedTables21717078464465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "damage_report" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "damage_report"`);
    }

}
