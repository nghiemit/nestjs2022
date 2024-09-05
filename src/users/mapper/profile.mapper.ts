import { Injectable, Scope } from '@nestjs/common';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileSerializer } from '../serializer/profile.serializer';

@Injectable({ scope: Scope.REQUEST })
export class ProfileMapper {
  //#region methods
  public toResponse(entity: ProfileEntity): ProfileSerializer {
    const dto = new ProfileSerializer();
    dto.id = entity.id;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.avatar = entity.avatar;

    return dto;
  }
  //#endregion
}
