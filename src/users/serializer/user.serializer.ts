import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserStatusEnum } from '../enum/user-status.enum';
import { ProfileSerializer } from './profile.serializer';

export class UserSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  isAdmin: boolean;

  @ApiProperty()
  @Expose()
  status: UserStatusEnum;

  @ApiProperty()
  @Expose()
  profileId: string;

  @ApiPropertyOptional()
  @Expose()
  profile?: ProfileSerializer;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
