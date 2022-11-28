import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import awsConfig from './config/aws.config';
import { LoggerModule, Logger } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';
import HealthModule from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { VideoModule } from './modules/video/video.module';

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
      load: [appConfig, databaseConfig, awsConfig],
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
    UsersModule,
    AuthModule,
    ProjectsModule,
    VideoModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/upload',
      }),
    }),
    {
      ...JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '604800s' },
      }),
      global: true,
    },
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule, PassportModule],
})
export class AppModule {}
