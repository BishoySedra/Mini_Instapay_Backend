import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // setting up the port
  const port = process.env.PORT || 3000;

  const protocol = process.env.APP_PROTOCOL || 'http';
  const app_url = process.env.APP_URL || 'localhost';

  // enabling CORS
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        `${protocol}://${app_url}`,
        undefined  // allow undefined for Swagger UI when loaded from same origin
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

  const config = new DocumentBuilder()
    .setTitle('Mini Instapay')
    .setDescription('API documentation for Mini Instapay')
    .setVersion('1.0')
    .addBearerAuth() // Add Bearer token authentication
    .addSecurityRequirements('bearer')
    .addServer(`${protocol}:://${app_url}`)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform input types based on DTO
      // whitelist: true, // Strip properties not defined in the DTO
      // forbidNonWhitelisted: true, // Reject requests with extra properties
    }),
  );

  await app.listen(port);

  console.log(`Swagger is running on: ${protocol}://${app_url}/docs`);
  console.log(`API is running on: ${protocol}://${app_url}`);
}
bootstrap();
