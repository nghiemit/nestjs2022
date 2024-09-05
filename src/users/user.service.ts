import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListUserQueryDto } from './dto/list-user.query.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { UserSerializer } from './serializer/user.serializer';
import { UserMapper } from './mapper/user-mapper';
import { ConfigService } from '@nestjs/config';
import { ProfileEntity } from './entities/profile.entity';
import { CreateUserType } from './model/create-user.model';
import { UpdateUserPayload } from './dto/update-user.payload';

@Injectable()
export class UserService {
  //#region constructor
  constructor(
    @InjectRepository(UserEntity)
    private readonly __userRepo: Repository<UserEntity>,
    private readonly __userMapper: UserMapper,
    private readonly __configService: ConfigService,
    private readonly __dataSource: DataSource,
  ) {}
  //#endregion

  //#region methods
  public async listUserAsync(dto: ListUserQueryDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 10;
    const offset = (page - 1) * limit;
    const [users, total] = await this.__userRepo
      .createQueryBuilder('user')
      .where('user.isAdmin = :notAdmin', { notAdmin: false })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const response = new Pagination<UserSerializer>(
      limit,
      total,
      page,
      users.map((u) => this.__userMapper.toResponse(u)),
    );
    return response;
  }

  public async getById(userId: string) {
    const user = await this.__userRepo.findOne({
      where: { id: userId },
      relations: { profile: true },
    });
    return this.__userMapper.toResponse(user);
  }

  public async adminCreateUserAsync(dto: CreateUserType) {
    let saveUser: UserEntity;
    await this.__dataSource.transaction(async (manager: EntityManager) => {
      const profile = new ProfileEntity();
      profile.firstName = dto.firstName;
      profile.lastName = dto.lastName;
      if (dto.avatar) {
        profile.avatar = dto.avatar;
      }
      if (dto.address) {
        profile.address = dto.address;
      }
      if (dto.phone) {
        profile.phone = dto.phone;
      }

      const newUser = new UserEntity();
      newUser.username = dto.username;
      newUser.email = dto.email;
      newUser.password = dto.password;
      newUser.hashPasswordBeforeInsert();
      newUser.isAdmin = false;
      newUser.profile = profile;

      saveUser = await manager.save(newUser);
    });
    return this.__userMapper.toResponse(saveUser);
  }

  public async adminDeleteUserAsync(userId: string): Promise<void> {
    const adminUsername: string = this.__configService.get<string>(
      'ADMIN_USERNAME',
      'admin',
    );
    const getUser = await this.__userRepo.findOneBy({ id: userId });
    if (!getUser) {
      throw new NotFoundException('User is not found!');
    }
    if (getUser.isAdmin && getUser.username === adminUsername) {
      throw new ForbiddenException('Oops!');
    }
    await this.__userRepo.delete({ id: userId });
    return void 0;
  }

  public async adminUpdateUserAsync(dto: UpdateUserPayload): Promise<void> {
    return void 0;
  }
  //#endregion
}
