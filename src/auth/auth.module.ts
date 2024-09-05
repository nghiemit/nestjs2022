import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ProfileEntity } from '../users/entities/profile.entity';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminAuthController } from './admin-auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT__SECRET'),
          signOptions: {
            expiresIn: `${configService.get<number>('JWT__EXPIRES_IN')}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
    UserModule,
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
