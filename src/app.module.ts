import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        // POSTGRES_HOST: Joi.string().required(),
        // POSTGRES_PORT: Joi.number().required(),
        // POSTGRES_USER: Joi.string().required(),
        // POSTGRES_PASSWORD: Joi.string().required(),
        // POSTGRES_DB: Joi.string().required(),
        APP_PORT: Joi.number(),
        // JWT_SECRET: Joi.string().required(),
        // JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
