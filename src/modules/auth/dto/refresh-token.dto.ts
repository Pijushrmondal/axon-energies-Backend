import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'a3f8c...',
    description: 'Refresh token received during OTP verification',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
