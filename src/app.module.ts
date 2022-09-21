import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { LoggerModule, Logger } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';
import HealthModule from './modules/health/health.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        APP_PORT: Joi.number(),
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      }),
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService, logger: Logger) => {
        const username = configService.get('database.user');
        const password = configService.get('database.password');
        const dbName = configService.get('database.dbName');
        const host = configService.get('database.host');
        const uri = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`;
        logger.log(`Connecting to database ${dbName} at ${uri}`);

        return {
          uri,
          dbName,
        };
      },
      inject: [ConfigService, Logger],
    }),
    HealthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
