import { Injectable } from '@nestjs/common';
import { SupplierEntity } from '../entities/supplier.entity';
import { SupplierSerializer } from '../serializer/supplier.serializer';

@Injectable()
export class SupplierMapper {
  //#region methods
  public toResponseDto(record: SupplierEntity): SupplierSerializer {
    const resDto = new SupplierSerializer();
    resDto.id = record.id;
    resDto.name = record.name;
    resDto.description = record.description;
    resDto.createdAt = record.createdAt;
    return resDto;
  }
  //#endregion
}
