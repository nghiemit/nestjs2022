import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './entities/product-category.entity';
import { ProductCategoryFacade } from './facade/product-category.facade';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategoryFacade],
  exports: [ProductCategoryFacade],
})
export class ProductCategoryModule {}
