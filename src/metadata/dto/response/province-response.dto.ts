import { ApiProperty } from '@nestjs/swagger';

export class ProvinceResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  nameWithType: string;

  @ApiProperty()
  code: string;
}
