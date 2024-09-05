import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandService } from '../brand.service';

@Injectable()
export class BrandFacade {
  //#region constructor
  constructor(private readonly __brandService: BrandService) {}
  //#endregion

  //#region methods
  public async checkBrandAsync(id: string) {
    const brand = await this.__brandService.getByIdAsync(id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
  }
  //#endregion
}
