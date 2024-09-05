import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictEntity } from '../entities';
import { Repository } from 'typeorm';
import { DistrictResponseDto } from '../dto/response/district-response.dto';
import { DistrictNotFoundException } from '../exceptions/district-not-found.exception';
import { DistrictMapper } from '../mapper/district.mapper';

@Injectable()
export class GetDistrictActionHandler {
  //#region constructor
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly __districtRepo: Repository<DistrictEntity>,
  ) {}
  //#endregion

  //#region public method
  public async executeAsync(payload: {
    districtCode: string;
  }): Promise<DistrictResponseDto> {
    const getDistrict = await this.__districtRepo.findOneBy({
      code: payload.districtCode,
    });
    if (!getDistrict) {
      throw new DistrictNotFoundException();
    }
    return DistrictMapper.toResponseDto(getDistrict);
  }
  //#endregion
}
