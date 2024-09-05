import { BaseEntity } from 'src/common/entities/base.entity';
import { DistrictEntity, ProvinceEntity, WardEntity } from 'src/metadata';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'warehouse' })
export class WarehouseEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'contact_name' })
  contactName: string;

  @Column({ name: 'contact_phone' })
  contactPhone: string;

  @Column({
    name: 'street_address',
  })
  public streetAddress: string;

  @Column({
    name: 'province_code',
    type: 'varchar',
  })
  public provinceCode: string;

  @Column({
    name: 'ward_code',
    type: 'varchar',
  })
  public wardCode: string;

  @Column({
    name: 'district_code',
    type: 'varchar',
  })
  public districtCode: string;

  @Column({
    name: 'owner_id',
    type: 'uuid',
  })
  public ownerId: string;

  @ManyToOne(() => ProvinceEntity)
  @JoinColumn({
    name: 'province_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'FK_Province_Warehouse',
  })
  public province: ProvinceEntity;

  @ManyToOne(() => WardEntity)
  @JoinColumn({
    name: 'ward_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'FK_Ward_Warehouse',
  })
  public ward: WardEntity;

  @ManyToOne(() => DistrictEntity)
  @JoinColumn({
    name: 'district_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'FK_District_Warehouse',
  })
  public district: DistrictEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_User_Warehouse',
  })
  public owner: UserEntity;
}
