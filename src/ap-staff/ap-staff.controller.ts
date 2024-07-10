import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApStaffService } from './ap-staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { JwtAuthGuard } from 'src/common/guards/auth-jwt.guard';
import { Roles } from 'src/common/decorators/roles-auth.decorator';
import { ERoles } from 'src/types';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('ap-staff')
export class ApStaffController {
  constructor(private readonly staffService: ApStaffService) {}

  @Post()
  createStaff(@Body() staffDto: CreateStaffDto) {
    this.staffService.createStaff(staffDto);
    return { success: true };
  }

  @Roles(ERoles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getStaffList() {
    return this.staffService.listStaff();
  }
}
