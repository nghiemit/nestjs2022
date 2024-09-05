import { IsString } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateSupplierBodyDto {
  @ApiProperty()
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
