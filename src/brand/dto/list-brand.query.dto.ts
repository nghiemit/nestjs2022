import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListBrandQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Max(1000)
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}
