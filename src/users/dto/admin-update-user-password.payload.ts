import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminUpdateUserPasswordPayload {
  @ApiProperty()
  @IsString()
  password: string;
}
