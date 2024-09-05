import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoryService } from '../product-category.service';

@Injectable()
export class ProductCategoryFacade {
  //#region constructor
  constructor(
    private readonly __productCategoryService: ProductCategoryService,
  ) {}
  //#endregion

  //#region methods
  public async checkCategory(id: string) {
    const getCat = await this.__productCategoryService.getByIdAsync(id);
    if (!getCat) {
      throw new NotFoundException('Product category not found');
    }

    return void 0;
  }
  //#endregion
}
