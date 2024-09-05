import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProvinceEntity } from './province.entity';
import { WardEntity } from './ward.entity';

@Entity({
  name: 'district',
})
@Index('UQ__District_Code', ['code'], { unique: true })
@Index('UQ__District_Code_ParentCode', ['code', 'parentCode'], {
  unique: true,
})
export class DistrictEntity {
  //#region Properties
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'code',
    type: 'varchar',
    nullable: false,
  })
  public code: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
  })
  public slug: string;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: false,
  })
  public type: string;

  @Column({
    name: 'name_with_type',
    type: 'varchar',
    nullable: false,
  })
  public nameWithType: string;

  @Column({
    name: 'path',
    type: 'varchar',
  })
  public path: string;

  @Column({
    name: 'path_with_type',
    type: 'varchar',
  })
  pathWithType: string;

  @Column({
    name: 'parent_code',
    type: 'varchar',
    nullable: false,
  })
  public parentCode: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  //#endregion

  //#region Navigation properties

  @ManyToOne(() => ProvinceEntity, (p) => p.districts)
  @JoinColumn({
    name: 'parent_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'FK_District_ParentCode__Province_Code',
  })
  province: ProvinceEntity;

  @OneToMany(() => WardEntity, (w) => w.district)
  public wards: WardEntity[];
  //#endregion
}
