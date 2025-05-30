import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewNoticeTable1748588062708 implements MigrationInterface {
  name = 'NewNoticeTable1748588062708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notice" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "body" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705062b14410ff1a04998f86d72" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notice"`);
  }
}
