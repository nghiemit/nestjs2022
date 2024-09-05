import { BrandEntity } from 'src/brand/entities/brand.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProductCategoryEntity } from 'src/product-category/entities/product-category.entity';
import { SupplierEntity } from 'src/supplier/entities/supplier.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { WarehouseEntity } from 'src/warehouse/entities/warehouse.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductStatuses } from '../enum/product-status.enum';
import { ProductImageEntity } from './product-image.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string | null;

  @Column({
    name: 'product_category_id',
    type: 'uuid',
    nullable: true,
  })
  public productCategoryId: string;

  @Column({
    name: 'owner_id',
    type: 'uuid',
  })
  public readonly ownerId: string;

  @Column({
    name: 'warehouse_id',
    type: 'uuid',
  })
  public warehouseId: string;

  @Column({
    name: 'brand_id',
    type: 'uuid',
    nullable: true,
  })
  public brandId: string;

  @Column({
    name: 'supplier_id',
    type: 'uuid',
    nullable: true,
  })
  public supplierId: string;

  @Column({
    type: 'enum',
    enum: ProductStatuses,
    default: ProductStatuses.UNPUBLISH,
  })
  status: ProductStatuses;

  @Column({ name: 'stock', type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn({
    name: 'product_category_id',
    referencedColumnName: 'id',
  })
  public productCategory: ProductCategoryEntity;

  @ManyToOne(() => WarehouseEntity)
  @JoinColumn({
    name: 'warehouse_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_Product_PickupWarehouseId__Warehouse_Id',
  })
  public warehouse: WarehouseEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  public owner: UserEntity;
  @ManyToOne(() => BrandEntity, (brand) => brand.product)
  @JoinColumn({
    name: 'brand_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_Product_BrandId__Brand_Id',
  })
  public brand: BrandEntity;

  @ManyToOne(() => SupplierEntity, (v) => v.product)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_Product_SupplierId__Supplier_Id',
  })
  public supplier: SupplierEntity;

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product)
  images: ProductImageEntity[];
}
