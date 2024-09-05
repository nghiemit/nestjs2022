import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common';

export class DistrictNotFoundException extends BusinessException {
  //#region constructor
  constructor() {
    super('DISTRICT_NOT_FOUND', 'District not found', HttpStatus.NOT_FOUND);
  }
  //#endregion
}
