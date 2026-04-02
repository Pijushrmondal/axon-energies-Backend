import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const AppConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('dev', 'development', 'production', 'test')
      .default('dev'),
    PORT: Joi.number().default(3000),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    DB_POOL_MAX: Joi.number().default(10),
    DB_POOL_MIN: Joi.number().default(2),
    DB_POOL_IDLE_TIMEOUT: Joi.number().default(30000),
    DB_POOL_CONN_TIMEOUT: Joi.number().default(5000),

    DB_RETRY_ATTEMPTS: Joi.number().default(5),
    DB_RETRY_DELAY: Joi.number().default(3000),
  }),
  validationOptions: {
    abortEarly: false,
    allowUnknown: true,
  },
});
