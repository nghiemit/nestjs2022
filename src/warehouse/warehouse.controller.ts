import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseBodyDto } from './dto/create-warehouse.body.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth-guard';
import { ListWarehouseQueryDto } from './dto/list-warehouse.query.dto';

@Controller('/v1/warehouse')
@ApiTags('Warehouse')
export class WarehouseController {
  //#region constructor
  constructor(private readonly __warehouseService: WarehouseService) {}
  //#endregion

  //#region public methods
  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async createAsync(@Req() req, @Body() dto: CreateWarehouseBodyDto) {
    const userId = req.user.userId;
    return await this.__warehouseService.createWarehouseAsync(userId, dto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async list(@Req() req, @Query() query: ListWarehouseQueryDto) {
    const authUserId = req.user.userId;
    return await this.__warehouseService.listAsync(authUserId, query);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getAsync(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const authUserId = req.user.userId;
    return await this.__warehouseService.getAsync(authUserId, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async deleteAsync(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const authUserId = req.user.userId;
    return await this.__warehouseService.deleteAsync(id, authUserId);
  }
  //#endregion
}
