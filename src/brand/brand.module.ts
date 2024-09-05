import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandMapper } from './mapper/brand.mapper';
import { BrandFacade } from './facade/brand.facade';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandService, BrandMapper, BrandFacade],
  controllers: [BrandController],
  exports: [BrandFacade, BrandMapper],
})
export class BrandModule {}
