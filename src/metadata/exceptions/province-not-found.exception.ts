import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common';

export class ProvinceNotFoundException extends BusinessException {
  //#region constructor
  constructor() {
    super('PROVINCE_NOT_FOUND', 'Province not found', HttpStatus.NOT_FOUND);
  }
  //#endregion
}
