import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { SupplierMapper } from './mapper/supplier.mapper';
import { CreateSupplierBodyDto } from './dto/create-supplier.dto';
import { UpdateSupplierBodyDto } from './dto/update-supplier.body.dto';
import { ListSupplierQueryDto } from './dto/list-supplier.query.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { SupplierSerializer } from './serializer/supplier.serializer';

@Injectable()
export class SupplierService {
  //#region constructor
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly __supplierRepo: Repository<SupplierEntity>,
    private readonly __supplierMapper: SupplierMapper,
  ) {}
  //#endregion

  //#region methods
  public async createAsync(dto: CreateSupplierBodyDto) {
    const getSupplierByName = await this.__supplierRepo.findOneBy({
      name: dto.name,
    });
    if (getSupplierByName) {
      throw new ConflictException('Supplier name is existed!');
    }
    const newSupplier = this.__supplierRepo.create({
      name: dto.name,
      description: dto.description,
    });
    const savedSupplier = await this.__supplierRepo.save(newSupplier);
    return this.__supplierMapper.toResponseDto(savedSupplier);
  }

  public async listAsync(
    query: ListSupplierQueryDto,
  ): Promise<Pagination<SupplierSerializer>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const queryBuilder = await this.__supplierRepo.createQueryBuilder(
      'supplier',
    );
    if (query.name) {
      queryBuilder.andWhere('supplier.name ILIKE :name', {
        name: `%${query.name}%`,
      });
    }
    queryBuilder.orderBy('supplier.createdAt', 'DESC');
    const [rs, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const paginateResult = new Pagination<SupplierSerializer>(
      limit,
      total,
      page,
      rs.map((item) => this.__supplierMapper.toResponseDto(item)),
    );
    return paginateResult;
  }

  public async getAsync(supplierId: string): Promise<SupplierSerializer> {
    const getSupplier = await this.__supplierRepo.findOneBy({ id: supplierId });
    if (!getSupplier) {
      throw new NotFoundException('Supplier is not found!');
    }
    return this.__supplierMapper.toResponseDto(getSupplier);
  }

  public async deleteAsync(supplierId: string): Promise<void> {
    const getSupplier = await this.__supplierRepo.findOneBy({ id: supplierId });
    if (!getSupplier) {
      throw new NotFoundException('Supplier is not found!');
    }
    await this.__supplierRepo.softDelete({ id: supplierId });
    return void 0;
  }

  public async updateAsync(
    supplierId: string,
    dto: UpdateSupplierBodyDto,
  ): Promise<void> {
    const getSupplier = await this.__supplierRepo.findOneBy({ id: supplierId });
    if (!getSupplier) {
      throw new NotFoundException('Supplier is not found!');
    }
    if (dto.name) {
      const getSupplierByName = await this.__supplierRepo.findOneBy({
        name: dto.name,
      });
      if (getSupplierByName && dto.name !== getSupplier.name) {
        throw new ConflictException('Supplier name is existed!');
      }
      getSupplier.name = dto.name;
    }
    if (dto.description) {
      getSupplier.description = dto.description;
    }
    await this.__supplierRepo.save(getSupplier);
    return void 0;
  }

  public async getByIdAsync(id: string) {
    return await this.__supplierRepo.findOneBy({ id: id });
  }
  //#endregion
}
