import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BrandSerializer } from 'src/brand/serializer/brand.serializer';
import { ProductCategorySerializer } from 'src/product-category/serializer/product-category.serializer';
import { SupplierSerializer } from 'src/supplier/serializer/supplier.serializer';
import { ProductImageSerializer } from './product-image.serializer';
import { WarehouseSerializer } from 'src/warehouse/serializer/warehouse.serializer';
import { UserSerializer } from '../../users/serializer/user.serializer';
import { ProductStatuses } from '../enum/product-status.enum';

export class ProductSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  productCategoryId: string;

  @ApiProperty()
  @Expose()
  productCategory: ProductCategorySerializer;

  @ApiProperty()
  @Expose()
  brandId: string;

  @ApiProperty()
  @Expose()
  brand: BrandSerializer;

  @ApiProperty()
  @Expose()
  supplierId: string;

  @ApiProperty()
  @Expose()
  supplier: SupplierSerializer;

  @ApiProperty()
  @Expose()
  images: ProductImageSerializer[];

  @ApiProperty()
  @Expose()
  warehouseId: string;

  @ApiProperty()
  @Expose()
  warehouse: WarehouseSerializer;

  @ApiProperty()
  @Expose()
  ownerId: string;

  @ApiProperty()
  @Expose()
  owner: UserSerializer;

  @ApiProperty()
  @Expose()
  status: ProductStatuses;

  @ApiProperty()
  @Expose()
  stock: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
