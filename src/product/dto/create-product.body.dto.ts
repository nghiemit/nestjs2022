import { IsBase64 } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateProductBodyDto {
  @ApiProperty()
  @IsString()
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

  @ApiProperty()
  @IsUUID('4')
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

  @ApiProperty()
  @IsInt()
  @Min(1)
  stock: number;

  @ApiPropertyOptional()
  @IsBase64({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  images: Array<string>;
}
