import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenTable1748795619925 implements MigrationInterface {
    name = 'RefreshTokenTable1748795619925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_8c3ca3e3f1ad4fb45ec6b793aa0"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_8c3ca3e3f1ad4fb45ec6b793aa0" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
