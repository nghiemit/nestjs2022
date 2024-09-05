import { BaseEntity } from 'src/common/entities/base.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'brand' })
export class BrandEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  product: ProductEntity[];
}
