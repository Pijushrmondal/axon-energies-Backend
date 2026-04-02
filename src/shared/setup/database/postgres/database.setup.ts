import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './database.config';

export const AppDatabaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => getDatabaseConfig(config),
});
