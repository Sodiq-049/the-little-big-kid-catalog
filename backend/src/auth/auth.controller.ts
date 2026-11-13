import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }

  // Lets the dashboard check whether a stored token is still valid
  @Get('me')
  @UseGuards(AdminGuard)
  me() {
    return { ok: true };
  }
}
