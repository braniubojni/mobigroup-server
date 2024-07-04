import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApStaffService } from 'src/ap-staff/ap-staff.service';
import { CreateStaffDto } from 'src/ap-staff/dto/create-staff.dto';
import * as bcrypt from 'bcrypt';
import { WRONG_CREDENTIALS } from 'src/common/constants/consts';
import { APStaff } from 'src/ap-staff/ap-staff.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly staffService: ApStaffService,
  ) {}

  private async validateStaff(dto: CreateStaffDto) {
    const staff = await this.staffService.getByEmail();

    const isPwdEqual = staff
      ? await bcrypt.compare(dto.password, staff.password)
      : null;
    if (isPwdEqual) {
      return staff;
    }
    throw new UnauthorizedException(WRONG_CREDENTIALS);
  }

  private genToken(staff: APStaff) {
    const { id, username, name, surname, role, email, phone, date } = staff;
    const payload = { id, username, name, surname, role, email, phone, date };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(staffDto: CreateStaffDto) {
    const staff = await this.validateStaff(staffDto);

    return this.genToken(staff);
  }
}
