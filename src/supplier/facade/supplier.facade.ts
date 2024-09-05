import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierService } from '../supplier.service';

@Injectable()
export class SupplierFacade {
  //#region constructor
  constructor(private readonly __supplierService: SupplierService) {}
  //#endregion

  //#region methods
  public async checkAsync(id: string) {
    const getSupplier = await this.__supplierService.getByIdAsync(id);
    if (!getSupplier) {
      throw new NotFoundException('Supplier not found');
    }

    return void 0;
  }
  //#endregion
}
