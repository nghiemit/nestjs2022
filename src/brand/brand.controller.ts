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
import { BrandService } from './brand.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth-guard';
import { AdminGuard } from 'src/common/guard/admin-guard';
import { CreateBrandBodyDto } from './dto/create-brand.body.dto';
import { ListBrandQueryDto } from './dto/list-brand.query.dto';
import { UpdateBrandBodyDto } from './dto/update-brand.body.dto';

@Controller('/v1/brand')
@ApiTags('Brand')
export class BrandController {
  //#region contructor
  constructor(private readonly __brandService: BrandService) {}
  //#endregion

  //#region methods
  @Post('')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async createAsync(@Body() dto: CreateBrandBodyDto) {
    return await this.__brandService.createAsync(dto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async listAsync(@Query() query: ListBrandQueryDto) {
    return await this.__brandService.listBrandAsync(query);
  }

  @Get('/:brandId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async getBrandAsync(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return await this.__brandService.getBrandAsync(brandId);
  }

  @Patch('/:brandId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async updateBrandAsync(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body() dto: UpdateBrandBodyDto,
  ) {
    return await this.__brandService.updateBrandAsync(brandId, dto);
  }

  @Delete('/:brandId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async deleteAsync(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return await this.__brandService.deleteBrandAsync(brandId);
  }
  //#endregion
}
