import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductCategoryBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
