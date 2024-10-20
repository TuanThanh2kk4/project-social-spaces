import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(new ValidationPipe());

  // Interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.use(cookieParser());

  // Config CORS
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
