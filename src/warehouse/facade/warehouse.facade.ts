import { Injectable, NotFoundException } from '@nestjs/common';
import { WarehouseService } from '../warehouse.service';

@Injectable()
export class WarehouseFacde {
  //#region constructor
  constructor(private readonly __warehouseService: WarehouseService) {}
  //#endregion

  //#region public
  public async getWarehouseById(id: string) {
    return await this.__warehouseService.getWarehouseById(id);
  }

  public async checkWarehouseAsync(id: string) {
    const warehouse = await this.__warehouseService.getWarehouseById(id);
    if (!warehouse) {
      throw new NotFoundException('Warehouse is not found');
    }
    return void 0;
  }
  //#endregion
}
