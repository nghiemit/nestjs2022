import { BusinessException } from 'src/common';

export class DistrictIsNotBelongToProvinceException extends BusinessException {
  //#region constructor
  constructor() {
    super(
      'DISTRICT_NOT_BELONG_TO_PROVINCE',
      'District is not belong to province',
    );
  }
  //#endregion
}
