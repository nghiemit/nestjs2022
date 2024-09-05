import { Injectable, Scope } from '@nestjs/common';
import { AdministrativeUnitsService } from '../services/administrative-units.service';
import { ProvinceNotFoundException } from '../exceptions/province-not-found.exception';
import { DistrictNotFoundException } from '../exceptions/district-not-found.exception';
import { WardNotFoundException } from '../exceptions/ward-not-found.exception';
import { WardIsNotBelongToDistrictException } from '../exceptions/ward-is-not-belong-to-district.exception';
import { DistrictIsNotBelongToProvinceException } from '../exceptions/district-is-not-belong-to-province.exception';

@Injectable({ scope: Scope.REQUEST })
export class ValidationAdministrativeUnits {
  //#region constructor
  constructor(
    private readonly __administrativeUnitsService: AdministrativeUnitsService,
  ) {}
  //#endregion

  public async checkExistProvince(code: string): Promise<void> {
    const province = await this.__administrativeUnitsService.getProvinceByCode(
      code,
    );
    if (!province) {
      throw new ProvinceNotFoundException();
    }
    return void 0;
  }

  public async checkExistDistrict(code: string): Promise<void> {
    const district = await this.__administrativeUnitsService.getDistrictByCode(
      code,
    );
    if (!district) {
      throw new DistrictNotFoundException();
    }
    return void 0;
  }

  public async checkExistWard(code: string): Promise<void> {
    const ward = await this.__administrativeUnitsService.getWardByCode(code);
    if (!ward) {
      throw new WardNotFoundException();
    }
    return void 0;
  }

  public async checkAWardBelongToDistrict(
    wardCode: string,
    districtCode: string,
  ): Promise<void> {
    const ward = await this.__administrativeUnitsService.getAWardInDistrict(
      wardCode,
      districtCode,
    );
    if (!ward) {
      throw new WardIsNotBelongToDistrictException();
    }
    return void 0;
  }

  public async checkADistrictBelongToProvince(
    districtCode: string,
    provinceCode: string,
  ): Promise<void> {
    const district =
      await this.__administrativeUnitsService.getADistrictInProvince(
        districtCode,
        provinceCode,
      );
    if (!district) {
      throw new DistrictIsNotBelongToProvinceException();
    }
    return void 0;
  }

  public async index(
    wardCode: string,
    districtCode: string,
    provinceCode: string,
  ): Promise<void> {
    await this.checkExistProvince(provinceCode);
    await this.checkExistDistrict(districtCode);
    await this.checkExistWard(wardCode);
    await this.checkADistrictBelongToProvince(districtCode, provinceCode);
    await this.checkAWardBelongToDistrict(wardCode, districtCode);
    return void 0;
  }
}
