import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { BasicRegisterBodyDto } from '../../auth/dto/basic-register.body';

@Injectable({ scope: Scope.REQUEST })
export class UserFacade {
  //#region constructor
  constructor(
    private readonly __dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly __userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly __profileRepo: Repository<ProfileEntity>,
  ) {}
  //#endregion

  //#region public methods
  public async createUserAsync(dto: BasicRegisterBodyDto) {
    let saveUser: UserEntity;
    await this.__dataSource.transaction(async (manager: EntityManager) => {
      const profile = new ProfileEntity();
      profile.firstName = dto.firstName;
      profile.lastName = dto.lastName;

      const newUser = new UserEntity();
      newUser.username = dto.username;
      newUser.email = dto.email;
      newUser.password = dto.password;
      newUser.hashPasswordBeforeInsert();
      newUser.isAdmin = false;
      newUser.profile = profile;

      saveUser = await manager.save(newUser);
    });
    return saveUser;
  }

  public async getUserByEmail(email: string) {
    return await this.__userRepo.findOne({ where: { email: email } });
  }

  public async getByUsername(username: string) {
    return await this.__userRepo.findOne({ where: { username: username } });
  }
  //#endregion
}
