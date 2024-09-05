import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common';

export class WardNotFoundException extends BusinessException {
  //#region constructor
  constructor() {
    super('WARD_NOT_FOUND', 'Ward not found', HttpStatus.NOT_FOUND);
  }
  //#endregion
}
