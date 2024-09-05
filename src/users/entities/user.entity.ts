import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserStatusEnum } from '../enum/user-status.enum';
import { ProfileEntity } from './profile.entity';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Index('UQ__User_username', {
    unique: true,
  })
  @Column({ nullable: false })
  username: string;

  @Index('UQ__User_email', {
    unique: true,
  })
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: true,
    name: 'active_account_token',
  })
  activeAccountToken: string;

  @Column({
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;

  @Column({
    name: 'is_admin',
    nullable: false,
  })
  isAdmin: boolean;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status: UserStatusEnum;

  @Column({
    name: 'reset_password_token',
    nullable: true,
  })
  public resetPasswordToken: string | null;

  @Column({
    name: 'reset_password_token_expiry_time',
    type: 'timestamp',
    nullable: true,
  })
  public resetPasswordTokenExpiryTime: Date | null;

  @Column({ type: String, name: 'profile_id', nullable: true })
  profileId: string;

  @OneToOne(() => ProfileEntity, { cascade: ['insert', 'remove'] })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      await this.hashPassword();
    }
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
