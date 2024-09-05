import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DistrictResponseDto } from 'src/metadata/dto/response/district-response.dto';
import { ProvinceResponseDto } from 'src/metadata/dto/response/province-response.dto';
import { WardResponseDto } from 'src/metadata/dto/response/ward-response.dto';
import { UserSerializer } from 'src/users/serializer/user.serializer';

export class WarehouseSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  contactName: string;

  @ApiProperty()
  @Expose()
  contactPhone: string;

  @ApiProperty()
  @Expose()
  provinceCode: string;

  @ApiProperty()
  @Expose()
  districtCode: string;

  @ApiProperty()
  @Expose()
  wardCode: string;

  @ApiProperty()
  @Expose()
  ward?: WardResponseDto;

  @ApiProperty()
  @Expose()
  district?: DistrictResponseDto;

  @ApiProperty()
  @Expose()
  province?: ProvinceResponseDto;

  @ApiProperty()
  @Expose()
  streetAddress: string;

  @ApiProperty()
  @Expose()
  ownerId: string;

  @ApiProperty()
  @Expose()
  owner?: UserSerializer;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
