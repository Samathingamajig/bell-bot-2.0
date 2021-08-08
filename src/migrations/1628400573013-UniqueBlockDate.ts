import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueBlockDate1628400573013 implements MigrationInterface {
  name = "UniqueBlockDate1628400573013";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."block" ADD CONSTRAINT "unique_block_date" UNIQUE ("year", "month", "day")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."block" DROP CONSTRAINT "unique_block_date"`);
  }
}
