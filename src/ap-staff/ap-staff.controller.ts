import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApStaffService } from './ap-staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';

@Controller('ap-staff')
export class ApStaffController {
  constructor(private readonly staffService: ApStaffService) {}

  @Post()
  createStaff(@Body() staffDto: CreateStaffDto) {
    return this.staffService.createStaff(staffDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getStaffList() {
    return this.staffService.listStaff();
  }
}
