import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply } from 'fastify';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<FastifyReply>();
    console.log(req, 'req');
    // try {
    // 	const authHeader = req.headers();
    // 	const [bearer, token] = authHeader.split(' ');
    // } catch (error) {

    // }
    return true;
  }
}
