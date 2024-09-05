import { BusinessException } from 'src/common';

export class WardIsNotBelongToDistrictException extends BusinessException {
  //#region constructor
  constructor() {
    super('WARD_NOT_BELONG_TO_DISTRICT', 'Ward is not belong to district');
  }
  //#endregion
}
