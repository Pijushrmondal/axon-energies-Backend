import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = config.get<string>('NODE_ENV') === 'production';

  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),

    // Never auto-sync schema — use migrations exclusively
    synchronize: false,

    // Entities are auto-registered via TypeOrmModule.forFeature() in each module
    autoLoadEntities: true,

    // SSL: required for AWS RDS in production
    ssl: isProduction ? { rejectUnauthorized: false } : false,

    // pg connection pool options (maps to node-postgres Pool constructor)
    extra: {
      max: config.get<number>('DB_POOL_MAX') ?? 10,
      min: config.get<number>('DB_POOL_MIN') ?? 2,
      idleTimeoutMillis: config.get<number>('DB_POOL_IDLE_TIMEOUT') ?? 30000,
      connectionTimeoutMillis:
        config.get<number>('DB_POOL_CONN_TIMEOUT') ?? 5000,
    },

    // Migrations path points to compiled output (used at runtime)
    migrations: ['dist/shared/setup/database/migrations/*.js'],
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,

    logging: isProduction ? ['error', 'warn'] : 'all',

    // NestJS wrapper-level retry on initial connection
    retryAttempts: config.get<number>('DB_RETRY_ATTEMPTS') ?? 5,
    retryDelay: config.get<number>('DB_RETRY_DELAY') ?? 3000,
  };
};
