import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class ListProductCategoryQueryDto {
  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  q: string;
}
