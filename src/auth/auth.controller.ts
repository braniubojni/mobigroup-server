import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/login')
  // async login(@Body() userDto: CreateUserDto) {
  //   return this.authService.login(userDto);
  // }

  // @Post('/registration')
  // async registration(@Body() userDto: CreateUserDto) {
  //   return this.authService.registration(userDto);
  // }
}
