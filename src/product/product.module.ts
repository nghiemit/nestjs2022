import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product-image.entity';
import { ProductService } from './product.service';
import { ProductController } from './product..controller';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { BrandModule } from '../brand/brand.module';
import { SupplierModule } from '../supplier/supplier.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { ProductMapper } from './mapper/product.mapper';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductImageEntity]),
    ProductCategoryModule,
    BrandModule,
    SupplierModule,
    WarehouseModule,
    UserModule,
  ],
  providers: [ProductService, ProductMapper],
  controllers: [ProductController],
})
export class ProductModule {}
