import { Injectable, Scope } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserSerializer } from '../serializer/user.serializer';
import { ProfileMapper } from './profile.mapper';

@Injectable({ scope: Scope.REQUEST })
export class UserMapper {
  //#region constructor
  constructor(private readonly __profileMapper: ProfileMapper) {}
  //#endregion

  public toResponse(entity: UserEntity): UserSerializer {
    const dto = new UserSerializer();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.isAdmin = entity.isAdmin;
    dto.status = entity.status;
    dto.profileId = entity.profileId;
    dto.profile = entity.profile
      ? this.__profileMapper.toResponse(entity.profile)
      : undefined;
    return dto;
  }
}
