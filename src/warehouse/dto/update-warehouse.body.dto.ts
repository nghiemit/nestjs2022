import { IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { vnPhoneRegexConst } from 'src/common/constants/regex.const';

export class UpdateWarehouseBodyDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contactName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(vnPhoneRegexConst, { message: 'invalid Vietnamese phone' })
  contactPhone: string;
}
