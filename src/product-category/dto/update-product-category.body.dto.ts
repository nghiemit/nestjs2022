import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductCategoryBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
