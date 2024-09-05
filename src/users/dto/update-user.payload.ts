import { IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBase64,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  usernameRegexConst,
  vnPhoneRegexConst,
} from '../../common/constants/regex.const';

export class UpdateUserPayload {
  @ApiPropertyOptional({
    description: 'First name of the user',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches(usernameRegexConst, {
    message:
      'Invalid username (lowercase chracter, numeric, dot and underscore)',
  })
  username: string;

  @ApiPropertyOptional({
    description: 'Email of the user',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(vnPhoneRegexConst, { message: 'invalid Vietnamese phone' })
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsBase64()
  avatar: string;
}
