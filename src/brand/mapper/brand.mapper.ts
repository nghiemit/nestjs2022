import { Injectable } from '@nestjs/common';
import { BrandEntity } from '../entities/brand.entity';
import { BrandSerializer } from '../serializer/brand.serializer';

@Injectable()
export class BrandMapper {
  //#region methods
  public toResponseDto(record: BrandEntity): BrandSerializer {
    const resDto = new BrandSerializer();
    resDto.id = record.id;
    resDto.name = record.name;
    resDto.description = record.description;
    resDto.createdAt = record.createdAt;
    return resDto;
  }
  //#endregion
}
