import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { usernameRegexConst } from 'src/common/constants/regex.const';

export class AdminLoginBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(usernameRegexConst, {
    message:
      'Invalid username (lowercase chracter, numeric, dot and underscore)',
  })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
