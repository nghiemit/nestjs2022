import { ApiProperty } from '@nestjs/swagger';

export class DistrictResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  nameWithType: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  pathWithType: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  parentCode: string;
}
