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
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth-guard';
import { AdminGuard } from 'src/common/guard/admin-guard';
import { ListUserQueryDto } from './dto/list-user.query.dto';
import { CreateUserPayload } from './dto/create-user.payload';
import { UpdateUserPayload } from './dto/update-user.payload';

@ApiTags('Admin interact with Users')
@Controller('/v1/admin/users')
export class AdminUserController {
  //#region constructor
  constructor(private readonly __userService: UserService) {}
  //#endregion

  //#region  methods
  @Get('')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async listUserAsync(@Query() dto: ListUserQueryDto) {
    return await this.__userService.listUserAsync(dto);
  }

  @Get('/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async getUserAsync(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.__userService.getById(userId);
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async deleteUserAsync(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.__userService.adminDeleteUserAsync(userId);
  }

  @Post('')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async createUserAsync(@Body() dto: CreateUserPayload) {
    return await this.__userService.adminCreateUserAsync(dto);
  }

  @Patch('/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  public async updateUserAsync(@Body() dto: UpdateUserPayload) {
    //
  }
  //#endregion
}
