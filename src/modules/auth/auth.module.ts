import { Module } from '@nestjs/common';
import { AppJwtModule } from '../../shared/setup/config/jwt.setup';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, AppJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
