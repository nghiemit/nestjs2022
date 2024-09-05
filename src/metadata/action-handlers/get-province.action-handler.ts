import { Injectable } from '@nestjs/common';
import { ProvinceResponseDto } from '../dto/response/province-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../entities';
import { Repository } from 'typeorm';
import { ProvinceNotFoundException } from '../exceptions/province-not-found.exception';
import { ProvinceMapper } from '../mapper/province.mapper';

@Injectable()
export class GetProvinceActionHandler {
  //#region constructor
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly __provinceRepo: Repository<ProvinceEntity>,
  ) {}
  //#endregion

  //#region public method
  public async executeAsync(payload: {
    provinceCode: string;
  }): Promise<ProvinceResponseDto> {
    const getProvince = await this.__provinceRepo.findOneBy({
      code: payload.provinceCode,
    });
    if (!getProvince) {
      throw new ProvinceNotFoundException();
    }
    return ProvinceMapper.toResponseDto(getProvince);
  }
  //#endregion
}
