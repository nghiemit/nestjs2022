import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity, ProvinceEntity, WardEntity } from './entities';
import { ListProvinceActionHandler } from './action-handlers/list-province.action-handler';
import { ListDistrictInProvinceActionHandler } from './action-handlers/list-district-in-province.action-handler';
import { ListWardInDistrictActionHandler } from './action-handlers/list-ward-in-district.action-handler';
import { GetProvinceActionHandler } from './action-handlers/get-province.action-handler';
import { GetDistrictActionHandler } from './action-handlers/get-district.action-handler';
import { GetWardActionHandler } from './action-handlers/get-ward.action-handler';
import { ValidationAdministrativeUnits } from './facade/validation-administrative-units.facade';
import { AdministrativeUnitsService } from './services/administrative-units.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProvinceEntity, DistrictEntity, WardEntity]),
  ],
  controllers: [MetadataController],
  providers: [
    ListProvinceActionHandler,
    GetProvinceActionHandler,
    ListDistrictInProvinceActionHandler,
    GetDistrictActionHandler,
    ListWardInDistrictActionHandler,
    GetWardActionHandler,
    AdministrativeUnitsService,
    ValidationAdministrativeUnits,
  ],
  exports: [ValidationAdministrativeUnits],
})
export class MetadataModule {}
