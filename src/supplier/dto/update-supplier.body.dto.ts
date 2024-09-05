import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateSupplierBodyDto {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty()
  description: string;
}
