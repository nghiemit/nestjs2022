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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../common/guard/jwt-auth-guard';
import { CreateProductBodyDto } from './dto/create-product.body.dto';
import { ListProductQueryDto } from './dto/list-product.query.dto';
import { UpdateProductBodyDto } from './dto/update-product..body.dto';

@Controller('/v1/product')
@ApiTags('Product')
export class ProductController {
  //#region constructor
  constructor(private readonly __productService: ProductService) {}
  //#endregion

  //#region methods
  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async createProductAsync(
    @Req() req,
    @Body() dto: CreateProductBodyDto,
  ) {
    const authUserId: string = req.user.userId;
    return await this.__productService.createProduct(authUserId, dto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async listProductAsync(@Query() query: ListProductQueryDto) {
    return await this.__productService.listProductAsync(query);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getProductAsync(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.__productService.getProductAsync(id, req.user.userId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async deleteAsync(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const authUserId: string = req.user.userId;
    return await this.__productService.deleteProductAsync(id, authUserId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async updateAsync(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductBodyDto,
  ) {
    const authUserId: string = req.user.userId;
    return await this.__productService.updateProductAsync(id, authUserId, dto);
  }
  //#endregion
}
