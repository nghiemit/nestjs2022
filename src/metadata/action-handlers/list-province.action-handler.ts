import { BadRequestException, Injectable } from '@nestjs/common';
import { ListProvinceDto } from '../dto/list-province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../entities';
import { Repository } from 'typeorm';
import { Pagination } from '../../common/pagination/pagination';
import { ProvinceMapper } from '../mapper/province.mapper';
import { ProvinceResponseDto } from '../dto/response/province-response.dto';
import { regexCheckOrderByListProvince } from '../constants/regex.constant';

@Injectable()
export class ListProvinceActionHandler {
  //#region constructor
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly __provinceRepo: Repository<ProvinceEntity>,
  ) {}
  //#endregion

  //#region public methods
  public async executeAsync(payload: { dto: ListProvinceDto }): Promise<any> {
    const page = payload.dto.page || 1;
    const limit = payload.dto.limit || 10;
    const offset = (page - 1) * limit;
    if (payload?.dto?.orderBy?.length) {
      for (const o of payload.dto.orderBy) {
        if (!regexCheckOrderByListProvince.test(o)) {
          throw new BadRequestException('Invalid query param');
        }
      }
    }
    const orderByArr = payload?.dto?.orderBy?.length
      ? payload.dto.orderBy
      : ['name.ASC'];
    const queryBuilder = this.__provinceRepo.createQueryBuilder('p');
    if (payload.dto.q) {
      queryBuilder.andWhere(
        '(p.name ILIKE :name OR p.slug ILIKE :slug OR p.name_with_type ILIKE :nameWithType)',
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
        queryBuilder.addOrderBy(`p.${oArr[0]}`, oArr[1] as 'DESC' | 'ASC');
      });
    }
    const [result, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const paginateResult: Pagination<ProvinceResponseDto> =
      new Pagination<ProvinceResponseDto>(
        limit,
        total,
        page,
        result.map((r) => ProvinceMapper.toResponseDto(r)),
      );
    return paginateResult;
  }
  //#endregion

  //#region private methods
  //#endregion
}
