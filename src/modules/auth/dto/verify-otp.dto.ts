import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: '9999999999',
    description: 'Registered mobile number of the user',
  })
  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @ApiProperty({
    example: '123456',
    description: 'OTP received on the registered mobile number',
  })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
