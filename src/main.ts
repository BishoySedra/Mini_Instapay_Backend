import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PassportModule } from '@nestjs/passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform input types based on DTO
      // whitelist: true, // Strip properties not defined in the DTO
      // forbidNonWhitelisted: true, // Reject requests with extra properties
    }),
  );
  await app.listen(3000);
}
bootstrap();
