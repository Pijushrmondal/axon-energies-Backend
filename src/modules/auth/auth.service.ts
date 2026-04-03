import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  private readonly testMobile: string;
  private readonly testOtp: string;
  private readonly isDev: boolean;
  private readonly refreshSecret: string;
  private readonly refreshExpiry: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.testMobile =
      this.config.get<string>('TEST_MOBILE_NUMBER') ?? '9999999999';
    this.testOtp = this.config.get<string>('TEST_OTP') ?? '123456';
    this.isDev = this.config.get<string>('NODE_ENV') !== 'production';
    this.refreshSecret = this.config.get<string>('REFRESH_JWT_SECRET')!;
    this.refreshExpiry = this.config.get<string>('REFRESH_JWT_EXPIRY') ?? '7d';
  }

  // ─── Send OTP ────────────────────────────────────────────────────────

  async sendOtp(dto: SendOtpDto): Promise<{ message: string; otp?: string }> {
    const user = await this.usersService.findByMobile(dto.mobileNumber);
    if (!user) {
      throw new NotFoundException('No user found with this mobile number');
    }

    const otp =
      dto.mobileNumber === this.testMobile
        ? this.testOtp
        : Math.floor(100000 + Math.random() * 900000).toString();

    const hashed = await bcrypt.hash(otp, 10);
    const expiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordOTP = hashed;
    user.resetPasswordOtpExpiration = expiration;
    await this.usersService.save(user);

    // In production, integrate your SMS provider here
    const response: { message: string; otp?: string } = {
      message: 'OTP sent successfully',
    };

    if (this.isDev) {
      response.otp = otp;
    }

    return response;
  }

  // ─── Verify OTP → access token + refresh token ───────────────────────

  async verifyOtp(
    dto: VerifyOtpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findByMobile(dto.mobileNumber);
    if (!user) {
      throw new NotFoundException('No user found with this mobile number');
    }

    if (!user.resetPasswordOTP || !user.resetPasswordOtpExpiration) {
      throw new UnauthorizedException('No OTP requested. Call send-otp first');
    }

    if (new Date() > user.resetPasswordOtpExpiration) {
      throw new UnauthorizedException('OTP has expired');
    }

    const isMatch = await bcrypt.compare(dto.otp, user.resetPasswordOTP);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid OTP');
    }

    // Issue tokens
    const payload = { sub: user.id, roleId: user.roleId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiry as any,
    });

    // Clear OTP only — no auth state stored in DB
    user.resetPasswordOTP = undefined;
    user.resetPasswordOtpExpiration = undefined;
    user.isLogin = true;
    await this.usersService.save(user);

    return { accessToken, refreshToken };
  }

  // ─── Refresh → new access token + new refresh token (rotating) ───────

  async refreshAccessToken(
    dto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let decoded: { sub: string; roleId: string };

    try {
      decoded = this.jwtService.verify<{ sub: string; roleId: string }>(
        dto.refreshToken,
        { secret: this.refreshSecret },
      );
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired refresh token. Please login again',
      );
    }

    const payload = { sub: decoded.sub, roleId: decoded.roleId };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiry as any,
    });

    return { accessToken, refreshToken };
  }
}
