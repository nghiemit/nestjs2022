import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity({
  name: 'ward',
})
@Index('UQ__Ward_Code', ['code'], { unique: true })
@Index('UQ__Ward_Code_ParentCode', ['code', 'parentCode'], {
  unique: true,
})
export class WardEntity {
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

  @ManyToOne(() => DistrictEntity, (d) => d.wards)
  @JoinColumn({
    name: 'parent_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'FK_Ward_ParentCode__District_Code',
  })
  district: DistrictEntity;

  //#endregion
}
