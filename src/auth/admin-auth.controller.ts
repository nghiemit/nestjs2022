import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AdminLoginBodyDto } from './dto/admin-login.body.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin authentication')
@Controller('/v1/admin/auth')
export class AdminAuthController {
  //#region constructor
  constructor(
    private readonly __dataSource: DataSource,
    private readonly __authService: AuthService,
  ) {}
  //#endregion

  //#region methods
  @Post()
  @HttpCode(HttpStatus.OK)
  public async adminLogin(@Body() dto: AdminLoginBodyDto) {
    const response = await this.__authService.adminLoginAsync(dto);
    return response;
  }
  //#endregion
}
