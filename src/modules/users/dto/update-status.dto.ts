import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export class UpdateStatusDto {
  @ApiProperty({
    example: 'inactive',
    description: 'New status for the user',
    enum: UserStatus,
  })
  @IsEnum(UserStatus)
  userStatus: UserStatus;
}
