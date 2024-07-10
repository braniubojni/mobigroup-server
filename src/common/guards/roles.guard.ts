import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { ApStaffService } from 'src/ap-staff/ap-staff.service';
import { NO_ACCESS, UNAUTH } from '../constants/consts';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private staffService: ApStaffService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const authHeader = (
        'authorization' in req.headers ? req.headers.authorization : ''
      ) as string;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: UNAUTH });
      }
      return from(this.jwtService.verifyAsync(token)).pipe(
        switchMap((verifiedStaff) =>
          from(this.staffService.getByUsername(verifiedStaff.username)).pipe(
            map((staff) => {
              req.staff = staff;
              return requiredRoles.includes(staff.role);
            }),
            catchError(() => {
              throw new HttpException(NO_ACCESS, HttpStatus.FORBIDDEN);
            }),
          ),
        ),
        catchError(() => {
          throw new UnauthorizedException({ message: UNAUTH });
        }),
      );
    } catch (error) {
      throw new HttpException(NO_ACCESS, HttpStatus.FORBIDDEN);
    }
  }
}
