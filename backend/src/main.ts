import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Comma-separated list of allowed frontend origins, e.g. "http://localhost:3000,https://catalog.example.com"
  // Browsers send origins without a trailing slash, so strip any from the config
  const origins = process.env.CORS_ORIGIN?.split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  app.enableCors({ origin: origins?.length ? origins : true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
