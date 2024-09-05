import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProfileSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiPropertyOptional()
  @Expose()
  avatar?: string;

  @ApiPropertyOptional()
  @Expose()
  phone: string;

  @ApiPropertyOptional()
  @Expose()
  address: string;
}
