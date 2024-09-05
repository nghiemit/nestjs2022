import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicRegisterBodyDto } from './dto/basic-register.body';
import { AuthService } from './auth.service';
import { BasicLoginBodyDto } from './dto/basic-login.body.dto';

@ApiTags('Authentication')
@Controller('/v1/auth')
export class AuthController {
  //#region constructor
  constructor(private readonly __authService: AuthService) {}
  //#endregion

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async registerAsync(@Body() registerPayload: BasicRegisterBodyDto) {
    return await this.__authService.registerAsync(registerPayload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginAsync(@Body() loginPayload: BasicLoginBodyDto) {
    return await this.__authService.loginAsync(loginPayload);
  }
}
