import { Module } from '@nestjs/common';
import { userProvider } from '../../shared/setup/database/postgres/providers/user.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AppJwtModule } from '../../shared/setup/config/jwt.setup';
import { JwtAuthGuard } from '../../shared/infra/guards/jwt-auth.guard';

@Module({
  imports: [AppJwtModule],
  controllers: [UsersController],
  providers: [UsersService, userProvider, JwtAuthGuard],
  exports: [UsersService, JwtAuthGuard],
})
export class UsersModule {}
