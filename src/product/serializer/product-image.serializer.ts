import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductImageSerializer {
  @ApiProperty()
  @Expose()
  image: string;

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
