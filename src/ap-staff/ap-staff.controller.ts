import { Body, Controller, Post } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { ApStaffService } from './ap-staff.service';

@Controller('ap-staff')
export class ApStaffController {
  constructor(private readonly staffService: ApStaffService) {}

  @Post()
  createStaff(@Body() staffDto: CreateStaffDto) {
    return this.staffService.createStaff(staffDto);
  }
}
