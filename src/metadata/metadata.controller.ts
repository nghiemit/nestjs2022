import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListProvinceDto } from './dto/list-province.dto';
import { ListProvinceActionHandler } from './action-handlers/list-province.action-handler';
import { ListDistrictDto } from './dto/list-district.dto';
import { ListDistrictInProvinceActionHandler } from './action-handlers/list-district-in-province.action-handler';
import { ListWardDto } from './dto/list-ward.dto';
import { ListWardInDistrictActionHandler } from './action-handlers/list-ward-in-district.action-handler';
import { GetProvinceActionHandler } from './action-handlers/get-province.action-handler';
import { GetDistrictActionHandler } from './action-handlers/get-district.action-handler';
import { GetWardActionHandler } from './action-handlers/get-ward.action-handler';

@Controller('/v1/metadata')
@ApiTags('metadata')
export class MetadataController {
  //#region constructor
  constructor(
    private readonly __listProvinceActionHandler: ListProvinceActionHandler,
    private readonly __getProvinceActionHandler: GetProvinceActionHandler,
    private readonly __listDistrictInProvinceActionHandler: ListDistrictInProvinceActionHandler,
    private readonly __getDistrictActionHandler: GetDistrictActionHandler,
    private readonly __listWardInDistrictActionHandler: ListWardInDistrictActionHandler,
    private readonly __getWardActionHandler: GetWardActionHandler,
  ) {}
  //#endregion

  //#region public method
  @Get('/provinces')
  async listProvince(@Query() dto: ListProvinceDto) {
    console.log(dto);
    return await this.__listProvinceActionHandler.executeAsync({ dto });
  }

  @Get('/provinces/:provinceCode')
  async getProvince(@Param('provinceCode') provinceCode: string) {
    return await this.__getProvinceActionHandler.executeAsync({ provinceCode });
  }

  @Get('/provinces/:provinceCode/districts')
  async listDistrictOfProvince(
    @Param('provinceCode') provinceCode: string,
    @Query() dto: ListDistrictDto,
  ) {
    return await this.__listDistrictInProvinceActionHandler.executeAsync({
      provinceCode,
      dto,
    });
  }

  @Get('/districts/:districtCode')
  async getDistrict(@Param('districtCode') districtCode: string) {
    return await this.__getDistrictActionHandler.executeAsync({ districtCode });
  }

  @Get('/provinces/:provinceCode/districts/:districtCode/wards')
  async listWardOfDistrict(
    @Param('provinceCode') provinceCode: string,
    @Param('districtCode') districtCode: string,
    @Query() dto: ListWardDto,
  ) {
    return await this.__listWardInDistrictActionHandler.executeAsync({
      provinceCode,
      districtCode,
      dto,
    });
  }

  @Get('/wards/:wardCode')
  async getWard(@Param('wardCode') wardCode: string) {
    return await this.__getWardActionHandler.executeAsync({ wardCode });
  }

  //#endregion
}
