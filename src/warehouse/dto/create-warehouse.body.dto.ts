import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { vnPhoneRegexConst } from 'src/common/constants/regex.const';

export class CreateWarehouseBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(vnPhoneRegexConst, { message: 'invalid Vietnamese phone' })
  contactPhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  provinceCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  districtCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  wardCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  streetAddress: string;
}
