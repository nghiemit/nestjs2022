import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductCategorySerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
