import { Injectable } from '@nestjs/common';
import { ProductSerializer } from '../serializer/product.serializer';
import { ProductEntity } from '../entities/product.entity';
import { ProductCategoryMapper } from '../../product-category/mapper/product-category.mapper';
import { WarehouseMapper } from '../../warehouse/mapper/warehouse.mapper';
import { BrandMapper } from '../../brand/mapper/brand.mapper';
import { SupplierMapper } from '../../supplier/mapper/supplier.mapper';
import { UserMapper } from '../../users/mapper/user-mapper';

@Injectable()
export class ProductMapper {
  //#region constructor
  constructor(
    private readonly __warehouseMapper: WarehouseMapper,
    private readonly __brandMapper: BrandMapper,
    private readonly __supplierMapper: SupplierMapper,
    private readonly __userMapper: UserMapper,
  ) {}
  //#endregion

  //#region methods
  public toResponseDto(record: ProductEntity): ProductSerializer {
    const res = new ProductSerializer();

    res.id = record.id;
    res.title = record.title;
    res.description = record.description;
    res.productCategoryId = record.productCategoryId;
    res.productCategory = record.productCategory
      ? ProductCategoryMapper.toResponseDto(record.productCategory)
      : undefined;
    res.warehouseId = record.warehouseId;
    res.warehouse = record.warehouse
      ? this.__warehouseMapper.toResponseDto(record.warehouse)
      : undefined;
    res.brandId = record.brandId;
    res.brand = record.brand
      ? this.__brandMapper.toResponseDto(record.brand)
      : undefined;
    res.supplierId = record.supplierId;
    res.supplier = record.supplier
      ? this.__supplierMapper.toResponseDto(record.supplier)
      : undefined;
    res.status = record.status;
    res.stock = record.stock;
    res.createdAt = record.createdAt;

    return res;
  }
  //#endregion
}
