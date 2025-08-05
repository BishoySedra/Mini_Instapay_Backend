import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import * as envs from "./utils/environment"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV || 'development';

  // Enable CORS
  const client_url = process.env.CLIENT_URL;
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        client_url,
        `http://localhost:${port}`,
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });


  // Setup Swagger only for non-test environments (optional logic)
  if (!envs.isTest()) {
    setupSwagger(app, env, port);
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
