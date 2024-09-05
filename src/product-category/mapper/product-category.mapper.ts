import { ProductCategoryEntity } from '../entities/product-category.entity';
import { ProductCategorySerializer } from '../serializer/product-category.serializer';

export class ProductCategoryMapper {
  static toResponseDto(
    record: ProductCategoryEntity,
  ): ProductCategorySerializer {
    const res = new ProductCategorySerializer();
    res.id = record.id;
    res.name = record.name;
    res.createdAt = record.createdAt;
    return res;
  }
}
