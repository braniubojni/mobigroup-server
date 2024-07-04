import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { APStaff } from './ap-staff.model';

@Injectable()
export class ApStaffService {
  constructor(@InjectModel(APStaff) private staffRepo: typeof APStaff) {}

  async createStaff(dto: CreateStaffDto) {
    const staff = await this.staffRepo.create(dto);
    return staff;
  }

  async listStaff() {
    const staffList = await this.staffRepo.findAll();
    return staffList;
  }
}
