import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guard/jwt-auth-guard';
@ApiTags('Users')
@Controller('/v1/users')
export class UserController {
  //#region constructor
  constructor(private readonly __userService: UserService) {}
  //#endregion

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getUserAsync(@Req() req) {
    console.log(req, req.user.userId, 'reqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    const authUserId: string = req.user.userId;
    return await this.__userService.getById(authUserId);
  }
  //#endregion
}
