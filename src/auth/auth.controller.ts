import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStaffDto } from 'src/ap-staff/dto/create-staff.dto';
import { GetStaffDto } from 'src/ap-staff/dto/get-staff.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() staffDto: GetStaffDto) {
    return this.authService.login(staffDto);
  }

  @Post('registration')
  async registration(@Body() staffDto: CreateStaffDto) {
    return this.authService.registration(staffDto);
  }
}
