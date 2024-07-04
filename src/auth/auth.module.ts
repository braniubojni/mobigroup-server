import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApStaffModule } from 'src/ap-staff/ap-staff.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ApStaffModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_!@#',
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
