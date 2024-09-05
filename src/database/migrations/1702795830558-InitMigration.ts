import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1702795830558 implements MigrationInterface {
    name = 'InitMigration1702795830558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "first_name" character varying, "last_name" character varying, "avatar" character varying, "phone" character varying, "address" character varying, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'BLOCK', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active_account_token" character varying, "is_verified" boolean NOT NULL DEFAULT false, "is_admin" boolean NOT NULL, "status" "public"."user_status_enum" NOT NULL DEFAULT 'ACTIVE', "reset_password_token" character varying, "reset_password_token_expiry_time" TIMESTAMP, "profile_id" uuid, CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__User_username" ON "user" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__User_email" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "ward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "slug" character varying NOT NULL, "type" character varying NOT NULL, "name_with_type" character varying NOT NULL, "path" character varying NOT NULL, "path_with_type" character varying NOT NULL, "parent_code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e6725fa4a50e449c4352d2230e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__Ward_Code_ParentCode" ON "ward" ("code", "parent_code") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__Ward_Code" ON "ward" ("code") `);
        await queryRunner.query(`CREATE TABLE "district" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "slug" character varying NOT NULL, "type" character varying NOT NULL, "name_with_type" character varying NOT NULL, "path" character varying NOT NULL, "path_with_type" character varying NOT NULL, "parent_code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__District_Code_ParentCode" ON "district" ("code", "parent_code") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__District_Code" ON "district" ("code") `);
        await queryRunner.query(`CREATE TABLE "province" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "slug" character varying NOT NULL, "type" character varying NOT NULL, "name_with_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ__Province_Code" ON "province" ("code") `);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "contact_name" character varying NOT NULL, "contact_phone" character varying NOT NULL, "street_address" character varying NOT NULL, "province_code" character varying NOT NULL, "ward_code" character varying NOT NULL, "district_code" character varying NOT NULL, "owner_id" uuid NOT NULL, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "product_id" uuid, "image" character varying, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_status_enum" AS ENUM('PUBLISH', 'UNPUBLISH')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" text NOT NULL, "product_category_id" uuid, "owner_id" uuid NOT NULL, "warehouse_id" uuid NOT NULL, "brand_id" uuid, "supplier_id" uuid, "status" "public"."product_status_enum" NOT NULL DEFAULT 'UNPUBLISH', "stock" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_Ward_ParentCode__District_Code" FOREIGN KEY ("parent_code") REFERENCES "district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_District_ParentCode__Province_Code" FOREIGN KEY ("parent_code") REFERENCES "province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_Province_Warehouse" FOREIGN KEY ("province_code") REFERENCES "province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_Ward_Warehouse" FOREIGN KEY ("ward_code") REFERENCES "ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_District_Warehouse" FOREIGN KEY ("district_code") REFERENCES "district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_User_Warehouse" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_ProductImage_Product_Id__Product_Id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_c385a97195418da0bd3a08ceced" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_Product_PickupWarehouseId__Warehouse_Id" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_c2eedda8bf0194e1fb299ee7424" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_Product_BrandId__Brand_Id" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_Product_SupplierId__Supplier_Id" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_Product_SupplierId__Supplier_Id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_Product_BrandId__Brand_Id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_c2eedda8bf0194e1fb299ee7424"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_Product_PickupWarehouseId__Warehouse_Id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_c385a97195418da0bd3a08ceced"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_ProductImage_Product_Id__Product_Id"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_User_Warehouse"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_District_Warehouse"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_Ward_Warehouse"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_Province_Warehouse"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_District_ParentCode__Province_Code"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_Ward_ParentCode__District_Code"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__Province_Code"`);
        await queryRunner.query(`DROP TABLE "province"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__District_Code"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__District_Code_ParentCode"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__Ward_Code"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__Ward_Code_ParentCode"`);
        await queryRunner.query(`DROP TABLE "ward"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__User_email"`);
        await queryRunner.query(`DROP INDEX "public"."UQ__User_username"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
    }

}
