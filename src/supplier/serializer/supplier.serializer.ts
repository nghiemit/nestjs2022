import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SupplierSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
