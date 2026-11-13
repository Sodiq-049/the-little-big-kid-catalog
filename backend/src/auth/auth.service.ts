import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { timingSafeEqual } from 'crypto';

export const ADMIN_EMAIL = 'hello@thelittlebigkid.net';

const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD');
    if (!adminPassword) {
      throw new UnauthorizedException('Admin password is not configured');
    }

    const emailOk = email.trim().toLowerCase() === ADMIN_EMAIL;
    const passwordOk = safeEqual(password, adminPassword);
    if (!emailOk || !passwordOk) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.jwt.signAsync({ sub: ADMIN_EMAIL, role: 'admin' });
    return { token, email: ADMIN_EMAIL };
  }
}
