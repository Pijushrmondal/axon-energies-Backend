import { Module } from '@nestjs/common';
import { userProvider } from '../../shared/setup/database/postgres/providers/user.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, userProvider],
  exports: [UsersService],
})
export class UsersModule {}
