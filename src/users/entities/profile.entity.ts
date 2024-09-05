import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'address', nullable: true })
  address: string;
}
