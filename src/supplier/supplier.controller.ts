import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth-guard';
import { AdminGuard } from 'src/common/guard/admin-guard';
import { CreateSupplierBodyDto } from './dto/create-supplier.dto';
import { ListSupplierQueryDto } from './dto/list-supplier.query.dto';
import { UpdateSupplierBodyDto } from './dto/update-supplier.body.dto';

@Controller('/v1/supplier')
@ApiTags('Supplier')
export class SupplierController {
  //#region contructor
  constructor(private readonly __supplierService: SupplierService) {}
  //#endregion

  //#region methods
  @Post('')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async createAsync(@Body() dto: CreateSupplierBodyDto) {
    return await this.__supplierService.createAsync(dto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async listAsync(@Query() query: ListSupplierQueryDto) {
    return await this.__supplierService.listAsync(query);
  }

  @Get('/:supplierId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async getAsync(
    @Param('supplierId', ParseUUIDPipe) supplierId: string,
  ) {
    return await this.__supplierService.getAsync(supplierId);
  }

  @Patch('/:supplierId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async updateBrandAsync(
    @Param('supplierId', ParseUUIDPipe) supplierId: string,
    @Body() dto: UpdateSupplierBodyDto,
  ) {
    return await this.__supplierService.updateAsync(supplierId, dto);
  }

  @Delete('/:supplierId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async deleteAsync(
    @Param('supplierId', ParseUUIDPipe) brandId: string,
  ) {
    return await this.__supplierService.deleteAsync(brandId);
  }
  //#endregion
}
