import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ListProvinceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  q: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => +value)
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(70)
  @Transform(({ value }) => +value)
  limit: number;

  @ApiPropertyOptional({
    type: 'array',
    isArray: true,
    description: `Format: "ten_truong.kieu_sap_xep" - ten_truong: camelKey, kieu_sap_xep: UPPERCASE; ten_truong (name, code, type)`,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  orderBy: Array<string>;
}
