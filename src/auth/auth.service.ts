import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { APStaff } from 'src/ap-staff/ap-staff.model';
import { ApStaffService } from 'src/ap-staff/ap-staff.service';
import { CreateStaffDto } from 'src/ap-staff/dto/create-staff.dto';
import { GetStaffDto } from 'src/ap-staff/dto/get-staff.dto';
import { WRONG_CREDENTIALS } from 'src/common/constants/consts';
import { ALREADY_EXISTS } from 'src/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly staffService: ApStaffService,
  ) {}

  private async validateStaff(dto: GetStaffDto) {
    const staff = await this.staffService.getByUsername(dto.username);

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

  async login(staffDto: GetStaffDto) {
    const staff = await this.validateStaff(staffDto);

    return this.genToken(staff);
  }

  async registration(staffDto: CreateStaffDto) {
    const staffExists = await this.staffService.getByUsername(
      staffDto.username,
    );
    if (staffExists) {
      throw new HttpException(ALREADY_EXISTS('Staff'), HttpStatus.CONFLICT);
    }
    const hashPwd = await bcrypt.hash(staffDto.password, 10);
    const staff = await this.staffService.createStaff({
      ...staffDto,
      password: hashPwd,
    });

    return this.genToken(staff);
  }
}
