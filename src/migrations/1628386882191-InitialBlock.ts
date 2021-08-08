import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialBlock1628386882191 implements MigrationInterface {
    name = 'InitialBlock1628386882191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "month" integer NOT NULL, "day" integer NOT NULL, "block" character varying NOT NULL, CONSTRAINT "PK_51cafb3a347f80b2e155f1185a9" PRIMARY KEY ("_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
