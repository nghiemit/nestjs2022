import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductBodyDto } from './dto/create-product.body.dto';
import { title } from 'process';
import { WarehouseFacde } from '../warehouse/facade/warehouse.facade';
import { ProductCategoryFacade } from '../product-category/facade/product-category.facade';
import { BrandFacade } from '../brand/facade/brand.facade';
import { SupplierFacade } from '../supplier/facade/supplier.facade';
import { ProductStatuses } from './enum/product-status.enum';
import { ProductImageEntity } from './entities/product-image.entity';
import { ProductMapper } from './mapper/product.mapper';
import { ListProductQueryDto } from './dto/list-product.query.dto';
import { ProductSerializer } from './serializer/product.serializer';
import { Pagination } from '../common/pagination/pagination';
import { UpdateProductBodyDto } from './dto/update-product..body.dto';

@Injectable()
export class ProductService {
  //#region constructor
  constructor(
    @InjectRepository(ProductEntity)
    private readonly __productRepo: Repository<ProductEntity>,
    private readonly __warehouseFacade: WarehouseFacde,
    private readonly __productCategoryFacade: ProductCategoryFacade,
    private readonly __brandFacade: BrandFacade,
    private readonly __supplierFacade: SupplierFacade,
    @InjectRepository(ProductImageEntity)
    private readonly __productImageRepo: Repository<ProductImageEntity>,
    private readonly __productMapper: ProductMapper,
  ) {}
  //#endregion

  //#region methods
  public async createProduct(authUserId: string, dto: CreateProductBodyDto) {
    const getProductByTitle = await this.getProductByTitle(authUserId, title);
    if (getProductByTitle) {
      throw new ConflictException('Product title is existed');
    }
    await this.__warehouseFacade.checkWarehouseAsync(dto.warehouseId);
    await this.__brandFacade.checkBrandAsync(dto.brandId);
    await this.__supplierFacade.checkAsync(dto.supplierId);
    if (dto.productCategoryId) {
      await this.__productCategoryFacade.checkCategory(dto.productCategoryId);
    }

    const newProduct = await this.__productRepo.create({
      title: dto.title,
      description: dto.description,
      ownerId: authUserId,
      productCategoryId: dto.productCategoryId,
      brandId: dto.brandId,
      supplierId: dto.supplierId,
      warehouseId: dto.warehouseId,
      status: ProductStatuses.UNPUBLISH,
      stock: dto.stock,
    });
    const savedProduct = await this.__productRepo.save(newProduct);
    const productId = savedProduct.id;
    if (dto.images?.length) {
      const newProductImages = dto.images.map((image) =>
        this.__productImageRepo.create({
          productId: productId,
          image: image,
        }),
      );
      await this.__productImageRepo.save(newProductImages);
    }
    return this.__productMapper.toResponseDto(savedProduct);
  }

  public async listProductAsync(query: ListProductQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.__productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.warehouse', 'warehouse');
    if (query.title) {
      queryBuilder.andWhere('product.title ILIKE :title', {
        title: `%${query.title}%`,
      });
    }

    queryBuilder.orderBy('product.created_at', 'DESC');
    const [result, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const response = new Pagination<ProductSerializer>(
      limit,
      total,
      page,
      result.map((r) => this.__productMapper.toResponseDto(r)),
    );
    return response;
  }

  public async getProductAsync(id: string, authUserId: string) {
    const getProduct = await this.__productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.warehouse', 'warehouse')
      .where('product.id = :id, product.owner_id = :ownerId', {
        id: id,
        ownerId: authUserId,
      })
      .getOne();
    if (!getProduct) {
      throw new NotFoundException('Product not found');
    }
    return this.__productMapper.toResponseDto(getProduct);
  }

  public async getProductByTitle(authUserId: string, title: string) {
    return await this.__productRepo.findOneBy({
      ownerId: authUserId,
      title: title,
    });
  }

  public async deleteProductAsync(id: string, authUserId: string) {
    const getProduct = await this.__productRepo.findOneBy({
      id: id,
      ownerId: authUserId,
    });
    if (!getProduct) {
      throw new NotFoundException('Product not found');
    }
    await this.__productRepo.softDelete({ id: id });
    return void 0;
  }

  public async updateProductAsync(
    id: string,
    authUserId: string,
    dto: UpdateProductBodyDto,
  ) {
    const getProduct = await this.__productRepo.findOneBy({
      id: id,
      ownerId: authUserId,
    });
    if (!getProduct) {
      throw new NotFoundException('Product not found');
    }
    if (dto.title) {
      const getProductByTitle = await this.getProductByTitle(
        authUserId,
        dto.title,
      );
      if (getProductByTitle && dto.title !== getProduct.title) {
        throw new ConflictException('Product title existed');
      }
      getProduct.title = dto.title;
    }
    if (dto.productCategoryId) {
      await this.__productCategoryFacade.checkCategory(dto.productCategoryId);
      getProduct.productCategoryId = dto.productCategoryId;
    }
    if (dto.brandId) {
      await this.__brandFacade.checkBrandAsync(dto.brandId);
      getProduct.brandId = dto.brandId;
    }
    if (dto.supplierId) {
      await this.__supplierFacade.checkAsync(dto.supplierId);
      getProduct.supplierId = dto.supplierId;
    }
    if (dto.stock) {
      getProduct.stock = dto.stock;
    }
  }
  //#endregion
}
