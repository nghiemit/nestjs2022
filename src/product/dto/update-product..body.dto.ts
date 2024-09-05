import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateProductBodyDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  productCategoryId: string;

  @ApiPropertyOptional()
  @IsUUID('4')
  @IsOptional()
  @IsNotEmpty()
  warehouseId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  brandId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  supplierId: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  stock: number;

  //   @ApiPropertyOptional()
  //   @IsArray()
  //   @ArrayNotEmpty()
  //   @IsOptional()
  //   images: Array<string>;
}
