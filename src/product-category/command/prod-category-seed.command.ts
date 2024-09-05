import { Command, CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { productCategories } from 'data-seed/prod-cat';
import { ProductCategoryEntity } from '../entities/product-category.entity';

@Command({
  name: 'seed_product_categories',
  description: 'Seed product categories',
})
export class ProductCategorySeederCommand extends CommandRunner {
  //#region constructor
  private readonly __logger = new Logger(ProductCategorySeederCommand.name);
  constructor(private readonly __dataSource: DataSource) {
    super();
  }
  //#endregion

  public async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const productCategoryRepo = this.__dataSource.getRepository(
      ProductCategoryEntity,
    );
    this.__logger.debug('Seed product category starting....');
    const categories = productCategories;
    if (categories?.length) {
      console.log(`It's ${categories?.length} will be save to db`);
      const newCats = categories.map((cat) =>
        productCategoryRepo.create({ name: cat }),
      );
      await productCategoryRepo.save(newCats);
    }
    this.__logger.debug('Seeding complete!');
  }
}
