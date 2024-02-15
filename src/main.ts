import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RunessExceptionFilter } from './modules/app/filters/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RunessExceptionFilter());
  app.enableCors({ origin: '*' });
  await app.listen((process.env.PORT as string) || '8000');
}

bootstrap();
