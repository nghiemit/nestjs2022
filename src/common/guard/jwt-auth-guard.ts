import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException({
        message: 'Access Token Expired',
        code: 'TOKEN_EXPIRED',
      });
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
