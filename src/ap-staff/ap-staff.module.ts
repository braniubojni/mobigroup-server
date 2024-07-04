import { Module } from '@nestjs/common';
import { ApStaffService } from './ap-staff.service';
import { ApStaffController } from './ap-staff.controller';
import { APStaff } from './ap-staff.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ApStaffService],
  controllers: [ApStaffController],
  imports: [SequelizeModule.forFeature([APStaff])],
  exports: [ApStaffService],
})
export class ApStaffModule {}
