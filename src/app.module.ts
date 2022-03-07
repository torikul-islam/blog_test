import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { async } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionFilter } from './common/filters';
import {
  ErrorLoggerInterceptor,
  RequestLoggerInterceptor,
  ResponseTransformInterceptor,
} from './common/interceptors';
import configuration from './config/configuration';
import { BlogController } from './modules/blog/blog.controller';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    }),
    BlogModule,
  ],
  controllers: [AppController, BlogController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ErrorLoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    AppService,
  ],
})
export class AppModule {}
