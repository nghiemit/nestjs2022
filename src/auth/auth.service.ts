import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ProfileEntity } from '../users/entities/profile.entity';
import { BasicRegisterBodyDto } from './dto/basic-register.body';
import { UserFacade } from '../users/facade/user.facade';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserMapper } from '../users/mapper/user-mapper';
import { BasicLoginBodyDto } from './dto/basic-login.body.dto';
import * as bcrypt from 'bcrypt';
import { AdminLoginBodyDto } from './dto/admin-login.body.dto';

@Injectable()
export class AuthService {
  //#region constructor
  constructor(
    private readonly __dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly __userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly __profileRepo: Repository<ProfileEntity>,
    private readonly __userFacade: UserFacade,
    private readonly __jwtService: JwtService,
    private readonly __configService: ConfigService,
    private readonly __userMapper: UserMapper,
  ) {}
  //#endregion

  //#region public methods
  public async registerAsync(dto: BasicRegisterBodyDto) {
    const getUserByEmail = await this.__userFacade.getUserByEmail(dto.email);
    if (getUserByEmail) {
      throw new ConflictException('Email existed!');
    }
    const newUser = await this.__userFacade.createUserAsync(dto);
    const jwtPayload = {
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    const accessToken = await this.__jwtService.signAsync(jwtPayload);
    return {
      accessToken: accessToken,
      user: this.__userMapper.toResponse(newUser),
    };
  }

  public async loginAsync(dto: BasicLoginBodyDto) {
    const getUserByEmail = await this.__userFacade.getUserByEmail(dto.email);
    if (!getUserByEmail) {
      throw new NotFoundException('User is not found!');
    }
    const isMatchPassword = await bcrypt.compare(
      dto.password,
      getUserByEmail.password,
    );
    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid credential!');
    }
    const jwtPayload = {
      userId: getUserByEmail.id,
      username: getUserByEmail.username,
      email: getUserByEmail.email,
      isAdmin: getUserByEmail.isAdmin,
    };
    const accessToken = await this.__jwtService.signAsync(jwtPayload);
    const response = {
      accessToken: accessToken,
      user: this.__userMapper.toResponse(getUserByEmail),
    };
    return response;
  }

  public async adminLoginAsync(dto: AdminLoginBodyDto) {
    const getUserByUsername = await this.__userFacade.getByUsername(
      dto.username,
    );
    if (!getUserByUsername) {
      throw new NotFoundException('User not found!');
    }
    const isMatchedPassword = await bcrypt.compare(
      dto.password,
      getUserByUsername.password,
    );
    if (!isMatchedPassword) {
      throw new UnauthorizedException('Invalid credential!');
    }
    const jwtPayload = {
      userId: getUserByUsername.id,
      username: getUserByUsername.username,
      isAdmin: getUserByUsername.isAdmin,
    };
    const accessToken = await this.__jwtService.signAsync(jwtPayload);
    const response = {
      accessToken: accessToken,
      user: this.__userMapper.toResponse(getUserByUsername),
    };
    return response;
  }
  //#endregion
}
