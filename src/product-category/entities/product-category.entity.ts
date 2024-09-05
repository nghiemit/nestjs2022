import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'product_category' })
export class ProductCategoryEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;
}
