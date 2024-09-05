import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductCategoryBodyDto } from './dto/create-product-category.body.dto';
import { ListProductCategoryQueryDto } from './dto/list-product-category.query.dto';
import { UpdateProductCategoryBodyDto } from './dto/update-product-category.body.dto';

@Controller('/v1/product-category')
@ApiTags('Product category')
export class ProductCategoryController {
  //#region constructor
  constructor(
    private readonly __productCategoryService: ProductCategoryService,
  ) {}
  //#endregion

  //#region methods
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async createAsync(@Body() dto: CreateProductCategoryBodyDto) {
    return await this.__productCategoryService.createAsync(dto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getAsync(@Query('id', ParseUUIDPipe) id: string) {
    return await this.__productCategoryService.getAsync(id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async listAsync(@Query() query: ListProductCategoryQueryDto) {
    return await this.__productCategoryService.listAsync(query);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async updateAsync(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductCategoryBodyDto,
  ) {
    return await this.__productCategoryService.updateAsync(id, dto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async deleteAsync(@Query('id', ParseUUIDPipe) id: string) {
    return await this.__productCategoryService.deleteAsync(id);
  }
  //#endregion
}
