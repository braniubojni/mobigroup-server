import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UNAUTH } from '../constants/consts';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    try {
      const authHeader = (
        'authorization' in req.headers ? req.headers.authorization : ''
      ) as string;

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(UNAUTH);
      }
      const staff = this.jwtService.verify(token);
      req.staff = staff;

      return true;
    } catch (error) {
      throw new UnauthorizedException(UNAUTH);
    }
  }
}
