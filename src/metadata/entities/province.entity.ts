import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity({
  name: 'province',
})
@Index('UQ__Province_Code', ['code'], { unique: true })
export class ProvinceEntity {
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

  @OneToMany(() => DistrictEntity, (d) => d.province)
  public districts: DistrictEntity[];

  //#endregion
}
