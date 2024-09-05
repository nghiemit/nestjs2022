import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandBodyDto } from './dto/create-brand.body.dto';
import { BrandMapper } from './mapper/brand.mapper';
import { ListBrandQueryDto } from './dto/list-brand.query.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { BrandSerializer } from './serializer/brand.serializer';
import { UpdateBrandBodyDto } from './dto/update-brand.body.dto';

@Injectable()
export class BrandService {
  //#region constructor
  constructor(
    @InjectRepository(BrandEntity)
    private readonly __brandRepo: Repository<BrandEntity>,
    private readonly __brandMapper: BrandMapper,
  ) {}
  //#endregion

  //#region methods
  public async createAsync(dto: CreateBrandBodyDto) {
    const getBrandByName = await this.__brandRepo.findOneBy({ name: dto.name });
    if (getBrandByName) {
      throw new ConflictException('Brand name is existed!');
    }
    const newBrand = this.__brandRepo.create({
      name: dto.name,
      description: dto.description,
    });
    const savedBrand = await this.__brandRepo.save(newBrand);
    return this.__brandMapper.toResponseDto(savedBrand);
  }

  public async listBrandAsync(
    query: ListBrandQueryDto,
  ): Promise<Pagination<BrandSerializer>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const queryBuilder = await this.__brandRepo.createQueryBuilder('brand');
    if (query.name) {
      queryBuilder.andWhere('brand.name ILIKE :name', {
        name: `%${query.name}%`,
      });
    }
    queryBuilder.orderBy('brand.createdAt', 'DESC');
    const [rs, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const paginateResult = new Pagination<BrandSerializer>(
      limit,
      total,
      page,
      rs.map((item) => this.__brandMapper.toResponseDto(item)),
    );
    return paginateResult;
  }

  public async getBrandAsync(brandId: string): Promise<BrandSerializer> {
    const getBrand = await this.__brandRepo.findOneBy({ id: brandId });
    if (!getBrand) {
      throw new NotFoundException('Brand is not found!');
    }
    return this.__brandMapper.toResponseDto(getBrand);
  }

  public async deleteBrandAsync(brandId: string): Promise<void> {
    const getBrand = await this.__brandRepo.findOneBy({ id: brandId });
    if (!getBrand) {
      throw new NotFoundException('Brand is not found!');
    }
    await this.__brandRepo.softDelete({ id: brandId });
    return void 0;
  }

  public async updateBrandAsync(
    brandId: string,
    dto: UpdateBrandBodyDto,
  ): Promise<void> {
    const getBrand = await this.__brandRepo.findOneBy({ id: brandId });
    if (!getBrand) {
      throw new NotFoundException('Brand is not found!');
    }
    if (dto.name) {
      const getBrandByName = await this.__brandRepo.findOneBy({
        name: dto.name,
      });
      if (getBrandByName && dto.name !== getBrand.name) {
        throw new ConflictException('Brand name is existed!');
      }
      getBrand.name = dto.name;
    }
    if (dto.description) {
      getBrand.description = dto.description;
    }
    await this.__brandRepo.save(getBrand);
    return void 0;
  }

  public async getByIdAsync(id: string) {
    return await this.__brandRepo.findOneBy({ id: id });
  }
  //#endregion
}
