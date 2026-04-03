import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './shared/setup/config/config.setup';
import { AppDatabaseModule } from './shared/setup/database/postgres/database.setup';

@Module({
  imports: [AppConfigModule, AppDatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
