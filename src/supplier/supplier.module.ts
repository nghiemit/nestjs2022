import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierMapper } from './mapper/supplier.mapper';
import { SupplierFacade } from './facade/supplier.facade';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [SupplierService, SupplierMapper, SupplierFacade],
  controllers: [SupplierController],
  exports: [SupplierFacade, SupplierMapper],
})
export class SupplierModule {}
