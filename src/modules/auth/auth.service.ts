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

@Injectable()
export class AuthService {
  private readonly testMobile: string;
  private readonly testOtp: string;
  private readonly isDev: boolean;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.testMobile =
      this.config.get<string>('TEST_MOBILE_NUMBER') ?? '9999999999';
    this.testOtp = this.config.get<string>('TEST_OTP') ?? '123456';
    this.isDev = this.config.get<string>('NODE_ENV') !== 'production';
  }

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
      response.otp = otp; // expose OTP only in dev for easy testing
    }

    return response;
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<{ accessToken: string }> {
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

    // Clear OTP after successful verification
    user.resetPasswordOTP = undefined;
    user.resetPasswordOtpExpiration = undefined;
    user.isLogin = true;
    await this.usersService.save(user);

    const payload = { sub: user.id, roleId: user.roleId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
