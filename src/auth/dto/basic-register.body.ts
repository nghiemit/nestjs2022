import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  usernameRegexConst,
  vnPhoneRegexConst,
} from '../../common/constants/regex.const';

export class BasicRegisterBodyDto {
  @ApiProperty({
    description: 'First name of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(usernameRegexConst, {
    message:
      'Invalid username (lowercase chracter, numeric, dot and underscore)',
  })
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
  })
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
}
