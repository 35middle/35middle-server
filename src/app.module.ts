import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { LoggerModule } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';

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
      load: [appConfig, databaseConfig],
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

    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@35middlenonprod.fwbnxxb.mongodb.net/testdb?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
