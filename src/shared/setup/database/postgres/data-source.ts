import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load .env before reading process.env
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,

  ssl: isProduction ? { rejectUnauthorized: false } : false,

  // Source-level paths — used by TypeORM CLI via ts-node
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/shared/setup/database/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',

  logging: isProduction ? ['error', 'warn'] : 'all',
});
