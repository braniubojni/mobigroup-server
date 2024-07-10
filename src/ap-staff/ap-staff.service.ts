import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { APStaff } from './ap-staff.model';
import { ALREADY_EXISTS } from 'src/common/helpers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApStaffService {
  constructor(@InjectModel(APStaff) private staffRepo: typeof APStaff) {}

  async createStaff(dto: CreateStaffDto) {
    const staffExists = await this.getByUsername(dto.username);
    if (staffExists) {
      throw new HttpException(ALREADY_EXISTS('Staff'), HttpStatus.CONFLICT);
    }
    const hashPwd = await bcrypt.hash(dto.password, 10);
    const staff = await this.staffRepo.create({
      ...dto,
      password: hashPwd,
    });
    return staff;
  }

  async listStaff() {
    const staffList = await this.staffRepo.findAll();
    return staffList;
  }

  async getByUsername(username: string): Promise<APStaff | null> {
    const staff = await this.staffRepo.findOne({
      where: {
        username,
      },
    });

    return staff;
  }
}
