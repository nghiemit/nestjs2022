import { BaseEntity } from 'src/common/entities/base.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'supplier' })
export class SupplierEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.supplier)
  product: ProductEntity[];
}
