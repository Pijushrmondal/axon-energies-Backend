import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'john_doe',
    description: 'Unique username',
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'Valid email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'NewPass@123',
    description: 'New password — minimum 6 characters',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: '9876543210',
    description: 'Mobile number (10 digits)',
  })
  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @ApiPropertyOptional({
    example: '3f6b1c2e-4d5a-4e8f-bc9d-1234567890ab',
    description: 'UUID of the role to assign',
  })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/avatar.png',
    description: 'URL of the profile picture',
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({
    example: '123 Main Street, Kolkata',
    description: 'User address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'Jane Doe',
    description: 'Point of contact name',
  })
  @IsOptional()
  @IsString()
  poc?: string;
}
