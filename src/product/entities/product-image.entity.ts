import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'product_image',
})
export class ProductImageEntity extends BaseEntity {
  @Column({
    name: 'product_id',
    type: 'uuid',
    nullable: true,
  })
  public productId: string;

  @Column({ name: 'image', nullable: true })
  image: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_ProductImage_Product_Id__Product_Id',
  })
  public product: ProductEntity;
}
