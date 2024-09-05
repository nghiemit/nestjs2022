import { Module } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { UserCommand } from '../users/command/init-user.command';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../database/data-source';
import { ProductCategorySeederCommand } from 'src/product-category/command/prod-category-seed.command';
import { SeedAdministrativeUnitsCommand } from 'src/metadata/command/seed-administrative-unit.command';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...dataSourceOptions,
          host: process.env.POSTGRES_DB_HOST,
          port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 5437,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB_NAME,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    UserCommand,
    ProductCategorySeederCommand,
    SeedAdministrativeUnitsCommand,
  ],
})
export class CommanderModule {}

async function bootstrap() {
  await CommandFactory.run(CommanderModule, ['warn', 'error', 'debug']);
}

bootstrap();
