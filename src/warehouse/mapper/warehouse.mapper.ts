import { WardMapper } from 'src/metadata/mapper/ward.mapper';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { WarehouseSerializer } from '../serializer/warehouse.serializer';
import { DistrictMapper } from 'src/metadata/mapper/district.mapper';
import { ProvinceMapper } from 'src/metadata/mapper/province.mapper';
import { UserMapper } from 'src/users/mapper/user-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseMapper {
  constructor(private readonly __userMapper: UserMapper) {}
  public toResponseDto(record: WarehouseEntity): WarehouseSerializer {
    const res = new WarehouseSerializer();
    res.id = record.id;
    res.name = record.name;
    res.contactName = record.contactName;
    res.contactPhone = record.contactPhone;
    res.provinceCode = record.provinceCode;
    res.districtCode = record.districtCode;
    res.wardCode = record.wardCode;
    res.province = record.province;
    res.district = record.district;
    res.ward = record.ward ? WardMapper.toResponseDto(record.ward) : undefined;
    res.district = record.district
      ? DistrictMapper.toResponseDto(record.district)
      : undefined;
    res.province = record.province
      ? ProvinceMapper.toResponseDto(record.province)
      : undefined;
    res.ownerId = record.ownerId;
    res.owner = record.owner
      ? this.__userMapper.toResponse(record.owner)
      : undefined;

    return res;
  }
}
