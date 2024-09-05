import { BadRequestException, Injectable } from '@nestjs/common';
import { ListWardDto } from '../dto/list-ward.dto';
import { Pagination } from '../../common/pagination/pagination';
import { WardResponseDto } from '../dto/response/ward-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictEntity, ProvinceEntity, WardEntity } from '../entities';
import { ProvinceNotFoundException } from '../exceptions/province-not-found.exception';
import { DistrictNotFoundException } from '../exceptions/district-not-found.exception';
import { WardMapper } from '../mapper/ward.mapper';
import { regexCheckOrderByListWard } from '../constants/regex.constant';

@Injectable()
export class ListWardInDistrictActionHandler {
  //#region constructor
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly __provinceRepo: Repository<ProvinceEntity>,
    @InjectRepository(DistrictEntity)
    private readonly __districtRepo: Repository<DistrictEntity>,
    @InjectRepository(WardEntity)
    private readonly __wardRepo: Repository<WardEntity>,
  ) {}
  //#endregion

  //#region public methods
  public async executeAsync(payload: {
    provinceCode: string;
    districtCode: string;
    dto: ListWardDto;
  }): Promise<Pagination<WardResponseDto>> {
    const page = payload.dto.page || 1;
    const limit = payload.dto.limit || 10;
    const offset = (page - 1) * limit;
    if (payload?.dto?.orderBy?.length) {
      for (const o of payload.dto.orderBy) {
        if (!regexCheckOrderByListWard.test(o)) {
          throw new BadRequestException('Invalid query param');
        }
      }
    }
    const orderByArr = payload?.dto?.orderBy?.length
      ? payload.dto.orderBy
      : ['name.ASC'];
    const getProvince = await this.__provinceRepo.findOneBy({
      code: payload.provinceCode,
    });
    if (!getProvince) {
      throw new ProvinceNotFoundException();
    }
    const getDistrict = await this.__districtRepo.findOneBy({
      code: payload.districtCode,
      parentCode: payload.provinceCode,
    });
    if (!getDistrict) {
      throw new DistrictNotFoundException();
    }
    const queryBuilder = this.__wardRepo
      .createQueryBuilder('w')
      .where('w.parent_code = :districtCode', {
        districtCode: payload.districtCode,
      });
    if (payload.dto.q) {
      queryBuilder.andWhere(
        '(w.name ILIKE :name OR w.slug ILIKE :slug OR w.name_with_type ILIKE :nameWithType)',
        {
          name: `%${payload.dto.q}%`,
          slug: `%${payload.dto.q}%`,
          nameWithType: `%${payload.dto.q}%`,
        },
      );
    }
    if (orderByArr.length) {
      orderByArr.forEach((o) => {
        const oArr = o.split('.');
        queryBuilder.addOrderBy(`w.${oArr[0]}`, oArr[1] as 'DESC' | 'ASC');
      });
    }
    const [result, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const paginateResult: Pagination<WardResponseDto> =
      new Pagination<WardResponseDto>(
        limit,
        total,
        page,
        result.map((r) => WardMapper.toResponseDto(r)),
      );
    return paginateResult;
  }
  //#endregion
}
