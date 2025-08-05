// src/config/swagger.config.ts
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, env: string, port: string | number) {
    const protocol = process.env.PROTOCOL || 'http';
    const appUrl = process.env.APP_URL || 'localhost';

    const config = new DocumentBuilder()
        .setTitle('Mini Instapay')
        .setDescription('API documentation for Mini Instapay')
        .setVersion('1.0')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .addServer(env === 'production' ? `${protocol}://${appUrl}` : `http://localhost:${port}`, `${env} Server`)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    console.log(`Swagger docs are available at: http://localhost:${port}/docs (${env} environment)`);
}
