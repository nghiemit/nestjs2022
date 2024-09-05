import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UserFacade } from './facade/user.facade';
import { UserMapper } from './mapper/user-mapper';
import { ProfileMapper } from './mapper/profile.mapper';
import { UserCommand } from './command/init-user.command';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [UserController, AdminUserController],
  providers: [UserFacade, UserMapper, ProfileMapper, UserCommand, UserService],
  exports: [UserFacade, UserMapper, ProfileMapper],
})
export class UserModule {}
