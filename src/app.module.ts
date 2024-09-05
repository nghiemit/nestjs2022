import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { BrandModule } from './brand/brand.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { MetadataModule } from './metadata/metadata.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...dataSourceOptions,
          host: process.env.POSTGRES_DB_HOST,
          port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 5437,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB_NAME,
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    BrandModule,
    SupplierModule,
    ProductCategoryModule,
    MetadataModule,
    WarehouseModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
