import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { CreateWarehouseBodyDto } from './dto/create-warehouse.body.dto';
import { ValidationAdministrativeUnits } from 'src/metadata/facade/validation-administrative-units.facade';
import { WarehouseMapper } from './mapper/warehouse.mapper';
import { ListWarehouseQueryDto } from './dto/list-warehouse.query.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { WarehouseSerializer } from './serializer/warehouse.serializer';

@Injectable()
export class WarehouseService {
  //#region constructor
  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly __warehouseRepo: Repository<WarehouseEntity>,
    private readonly __validationAdministrativeUnits: ValidationAdministrativeUnits,
    private readonly __warehouseMapper: WarehouseMapper,
  ) {}
  //#endregion

  //#region methods
  public async createWarehouseAsync(
    authUserId: string,
    dto: CreateWarehouseBodyDto,
  ) {
    const getWarehouseByName = await this.__warehouseRepo.findOneBy({
      name: dto.name,
    });
    if (getWarehouseByName) {
      throw new ConflictException('Warehouse name is existed!');
    }
    await this.__validationAdministrativeUnits.index(
      dto.wardCode,
      dto.districtCode,
      dto.provinceCode,
    );
    const newWarehouse = await this.__warehouseRepo.create({
      name: dto.name,
      contactName: dto.contactName,
      contactPhone: dto.contactPhone,
      wardCode: dto.wardCode,
      districtCode: dto.districtCode,
      provinceCode: dto.provinceCode,
      streetAddress: dto.streetAddress,
      ownerId: authUserId,
    });
    const savedWarehouse = await this.__warehouseRepo.save(newWarehouse);
    return this.__warehouseMapper.toResponseDto(savedWarehouse);
  }

  public async listAsync(authUserId: string, queryDto: ListWarehouseQueryDto) {
    const page = queryDto.page || 1;
    const limit = queryDto.limit || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.__warehouseRepo.createQueryBuilder('warehouse');
    if (queryDto.name) {
      queryBuilder.andWhere('warehouse.name ILIKE :name', {
        name: `%${queryDto.name}%`,
      });
    }
    queryBuilder.orderBy('warehouse.created_at', 'DESC');
    const [result, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const res = new Pagination<WarehouseSerializer>(
      limit,
      total,
      page,
      result.map((r) => this.__warehouseMapper.toResponseDto(r)),
    );
    return res;
  }

  public async getAsync(authUserId: string, warehouseId: string) {
    const getWarehouse = await this.__warehouseRepo.findOne({
      where: { id: warehouseId, ownerId: authUserId },
      relations: { ward: true, district: true, province: true },
    });
    if (!getWarehouse) {
      throw new NotFoundException('Warehouse not found');
    }
    return this.__warehouseMapper.toResponseDto(getWarehouse);
  }

  public async deleteAsync(id: string, authUserId: string) {
    const getWarehouse = await this.__warehouseRepo.findOneBy({
      id: id,
      ownerId: authUserId,
    });
    console.log(getWarehouse);
    if (!getWarehouse) {
      throw new NotFoundException('Warehouse not found');
    }
    await this.__warehouseRepo.softDelete({ id: id });
    return void 0;
  }

  public async getWarehouseById(id: string) {
    return await this.__warehouseRepo.findOneBy({ id: id });
  }
  //#endregion
}
