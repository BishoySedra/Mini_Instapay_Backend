import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {

  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Use environment variable for port or default to 3000
  const port = process.env.PORT || 3000;
  const protocol = process.env.PROTOCOL || 'http';
  const app_url = process.env.APP_URL || 'localhost';
  const node_env = process.env.NODE_ENV || 'development';

  // Swagger setup only in non-production environments
  let config = null;
  if (node_env === 'production') {
    config = new DocumentBuilder()
      .setTitle('Mini Instapay')
      .setDescription('API documentation for Mini Instapay')
      .setVersion('1.0')
      .addBearerAuth() // Add Bearer token authentication
      .addSecurityRequirements('bearer')
      .addServer(`${protocol}://${app_url}`, 'Production Server')
      .build();

    const document = SwaggerModule.createDocument(app, config); // Generate the Swagger document
    SwaggerModule.setup('docs', app, document); // Pass the document directly

    console.log(`Swagger docs are available at: http://localhost:${port}/docs`);
  } else {
    config = new DocumentBuilder()
      .setTitle('Mini Instapay')
      .setDescription('API documentation for Mini Instapay')
      .setVersion('1.0')
      .addBearerAuth() // Add Bearer token authentication
      .addSecurityRequirements('bearer')
      .addServer(`http://localhost:${port}`, 'Development Server')
      .build();

    const document = SwaggerModule.createDocument(app, config); // Generate the Swagger document
    SwaggerModule.setup('docs', app, document); // Pass the document directly

    console.log(`Swagger docs are available at: http://localhost:${port}/docs`);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform input types based on DTO
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Reject requests with extra properties
    }),
  );

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
