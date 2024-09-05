import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ListUserQueryDto {
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
}
