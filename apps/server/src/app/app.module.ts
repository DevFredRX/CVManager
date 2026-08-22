import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import * as path from 'path'

import moduleConfig from '@config/module.config';
import databaseConfig from '@config/database.config';

import { AppService } from '@app/app.service';
import { AppController } from '@app/app.controller';
import { LoggerMiddleware } from '@middlewares/logger.middleware';

import { UserModule } from '@user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [moduleConfig, databaseConfig],
      envFilePath: path.join(process.cwd(), '../.env')
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get<DataSourceOptions>('database')
        if (!dbConfig) throw new Error('Database configuration not found.')
        return dbConfig
      }
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
