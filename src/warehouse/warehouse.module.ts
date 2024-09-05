import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseMapper } from './mapper/warehouse.mapper';
import { MetadataModule } from 'src/metadata/metadata.module';
import { UserModule } from 'src/users/user.module';
import { WarehouseFacde } from './facade/warehouse.facade';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehouseEntity]),
    MetadataModule,
    UserModule,
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseMapper, WarehouseFacde],
  exports: [WarehouseFacde, WarehouseMapper],
})
export class WarehouseModule {}
