import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username for the user',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPass@123',
    description: 'Password — minimum 6 characters',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: '3f6b1c2e-4d5a-4e8f-bc9d-1234567890ab',
    description: 'UUID of the role to assign to the user',
  })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiPropertyOptional({
    example: '9999999999',
    description: 'Mobile number (10 digits)',
  })
  @IsOptional()
  @IsString()
  mobileNumber?: string;
}
