import {
  ConflictException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { CreateProductCategoryBodyDto } from './dto/create-product-category.body.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './entities/product-category.entity';
import { Repository } from 'typeorm';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { ProductCategorySerializer } from './serializer/product-category.serializer';
import { UpdateProductCategoryBodyDto } from './dto/update-product-category.body.dto';
import { ListProductCategoryQueryDto } from './dto/list-product-category.query.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable({ scope: Scope.REQUEST })
export class ProductCategoryService {
  //#region constructor
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly __productCategoryRepo: Repository<ProductCategoryEntity>,
  ) {}
  //#endregion

  //#region public methods
  public async createAsync(
    dto: CreateProductCategoryBodyDto,
  ): Promise<ProductCategorySerializer> {
    const getCategoryByName = await this.__productCategoryRepo.findOneBy({
      name: dto.name,
    });
    if (getCategoryByName) {
      throw new ConflictException('Product category is existed');
    }
    const newCat = this.__productCategoryRepo.create({ name: dto.name });
    const savedCat = await this.__productCategoryRepo.save(newCat);

    return ProductCategoryMapper.toResponseDto(savedCat);
  }

  public async getAsync(id: string): Promise<ProductCategorySerializer> {
    const getCat = await this.__productCategoryRepo.findOneBy({ id: id });
    if (!getCat) {
      throw new NotFoundException('Product category not found');
    }
    return ProductCategoryMapper.toResponseDto(getCat);
  }

  public async updateAsync(
    id: string,
    dto: UpdateProductCategoryBodyDto,
  ): Promise<void> {
    const getCatToUpdate = await this.__productCategoryRepo.findOneBy({
      id: id,
    });
    const getCatByName = await this.__productCategoryRepo.findOneBy({
      name: dto.name,
    });

    if (getCatByName && getCatToUpdate.name !== dto.name) {
      throw new ConflictException('Product category name is existed');
    }
    getCatToUpdate.name = dto.name;
    await this.__productCategoryRepo.save(getCatToUpdate);

    return void 0;
  }

  public async listAsync(
    query: ListProductCategoryQueryDto,
  ): Promise<Pagination<ProductCategorySerializer>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.__productCategoryRepo.createQueryBuilder();
    if (query.q) {
      queryBuilder.andWhere('name = :q', { q: `%${query.q}%` });
    }

    queryBuilder.orderBy('created_at', 'DESC');
    const [result, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const response = new Pagination<ProductCategorySerializer>(
      limit,
      total,
      page,
      result?.map((r) => ProductCategoryMapper.toResponseDto(r)) || [],
    );

    return response;
  }

  public async deleteAsync(id: string): Promise<void> {
    const getCat = await this.__productCategoryRepo.findOneBy({ id: id });
    if (!getCat) {
      throw new NotFoundException('Product category not found');
    }
    await this.__productCategoryRepo.softDelete({ id: id });
    return void 0;
  }

  public async getByIdAsync(id: string) {
    return await this.__productCategoryRepo.findOneBy({ id: id });
  }
  //#endregion
}
