import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, LogLevel, ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

import { AppModule } from '@app/app.module';

dotenv.config({ path: path.resolve(process.cwd(), '../.env'), quiet: true })

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(path.join(process.cwd(), '../ssl', 'localhost.key')),
    cert: fs.readFileSync(path.join(process.cwd(), '../ssl', 'localhost.crt')),
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const configService = app.get(ConfigService)
  const logLevels = configService.get<LogLevel[]>('module.level')
  app.useLogger(logLevels!)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const frontend = configService.get<string>('module.frontend')
  app.enableCors({
    origin: frontend,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })

  await app.listen(process.env.NEST_PORT!);

}

bootstrap();
