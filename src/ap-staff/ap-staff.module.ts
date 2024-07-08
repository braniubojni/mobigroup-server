import { Module } from '@nestjs/common';
import { ApStaffService } from './ap-staff.service';
import { ApStaffController } from './ap-staff.controller';
import { APStaff } from './ap-staff.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ApStaffService],
  controllers: [ApStaffController],
  imports: [
    SequelizeModule.forFeature([APStaff]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_!@#',
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  exports: [ApStaffService],
})
export class ApStaffModule {}
