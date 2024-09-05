import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictEntity, ProvinceEntity, WardEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class AdministrativeUnitsService {

  //#region constructor
  constructor(
    @InjectRepository(ProvinceEntity) private readonly __provinceRepo: Repository<ProvinceEntity>,
    @InjectRepository(DistrictEntity) private readonly __districtRepo: Repository<DistrictEntity>,
    @InjectRepository(WardEntity) private readonly __wardRepo: Repository<WardEntity>,
  ) {}
  //#endregion

  //#region methods
  public async getProvinceByCode(code: string): Promise<ProvinceEntity | undefined> {
    return await this.__provinceRepo.findOneBy({ code: code });
  }

  public async getDistrictByCode(code: string): Promise<DistrictEntity | undefined> {
    return await this.__districtRepo.findOneBy({ code: code });
  }

  public async getWardByCode(code: string): Promise<WardEntity | undefined> {
    return await this.__wardRepo.findOneBy({ code: code });
  }

  public async getAWardInDistrict(wardCode: string, districtCode: string): Promise<WardEntity | undefined> {
    return await this.__wardRepo.findOneBy({ code: wardCode, parentCode: districtCode });
  }

  public async getADistrictInProvince(districtCode: string, provinceCode: string): Promise<DistrictEntity | undefined> {
    return await this.__districtRepo.findOneBy({ code: districtCode, parentCode: provinceCode });
  }
  //#endregion
}
