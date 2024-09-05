import { BadRequestException, Injectable } from '@nestjs/common';
import { ListDistrictDto } from '../dto/list-district.dto';
import { Pagination } from '../../common/pagination/pagination';
import { DistrictResponseDto } from '../dto/response/district-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictEntity, ProvinceEntity } from '../entities';
import { Repository } from 'typeorm';
import { ProvinceNotFoundException } from '../exceptions/province-not-found.exception';
import { DistrictMapper } from '../mapper/district.mapper';
import { regexCheckOrderByListDistrict } from '../constants/regex.constant';

@Injectable()
export class ListDistrictInProvinceActionHandler {
  //#region constructor
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly __provinceRepo: Repository<ProvinceEntity>,
    @InjectRepository(DistrictEntity)
    private readonly __districtRepo: Repository<DistrictEntity>,
  ) {}
  //#endregion

  //#region public methods
  public async executeAsync(payload: {
    provinceCode: string;
    dto: ListDistrictDto;
  }): Promise<Pagination<DistrictResponseDto>> {
    const page = payload.dto.page || 1;
    const limit = payload.dto.limit || 10;
    const offset = (page - 1) * limit;
    if (payload?.dto?.orderBy?.length) {
      for (const o of payload.dto.orderBy) {
        if (!regexCheckOrderByListDistrict.test(o)) {
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

    const queryBuilder = this.__districtRepo
      .createQueryBuilder('d')
      .where('d.parent_code = :parentCode', {
        parentCode: payload.provinceCode,
      });
    if (payload.dto.q) {
      queryBuilder.andWhere(
        '(d.name ILIKE :name OR d.slug ILIKE :slug OR d.name_with_type ILIKE :nameWithType)',
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
        queryBuilder.addOrderBy(`d.${oArr[0]}`, oArr[1] as 'DESC' | 'ASC');
      });
    }
    const [result, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const paginateResult: Pagination<DistrictResponseDto> =
      new Pagination<DistrictResponseDto>(
        limit,
        total,
        page,
        result.map((r) => DistrictMapper.toResponseDto(r)),
      );
    return paginateResult;
  }
  //#endregion
}
