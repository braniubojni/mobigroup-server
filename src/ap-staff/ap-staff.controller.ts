import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApStaffService } from './ap-staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { JwtAuthGuard } from 'src/common/guards/auth-jwt.guard';

@Controller('ap-staff')
export class ApStaffController {
  constructor(private readonly staffService: ApStaffService) {}

  @Post()
  createStaff(@Body() staffDto: CreateStaffDto) {
    return this.staffService.createStaff(staffDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getStaffList() {
    return this.staffService.listStaff();
  }
}
