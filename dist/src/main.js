"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const port = process.env.PORT || 3000;
    const protocol = process.env.PROTOCOL || 'http';
    const app_url = process.env.APP_URL || 'localhost';
    const node_env = process.env.NODE_ENV || 'development';
    let config = null;
    if (node_env === 'production') {
        config = new swagger_1.DocumentBuilder()
            .setTitle('Mini Instapay')
            .setDescription('API documentation for Mini Instapay')
            .setVersion('1.0')
            .addBearerAuth()
            .addSecurityRequirements('bearer')
            .addServer(`${protocol}://${app_url}`, 'Production Server')
            .build();
        const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, documentFactory);
        console.log(`Swagger docs are available at: http://localhost:${port}/docs`);
    }
    else {
        config = new swagger_1.DocumentBuilder()
            .setTitle('Mini Instapay')
            .setDescription('API documentation for Mini Instapay')
            .setVersion('1.0')
            .addBearerAuth()
            .addSecurityRequirements('bearer')
            .addServer(`http://localhost:${port}`, 'Development Server')
            .build();
        const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, documentFactory);
        console.log(`Swagger docs are available at: http://localhost:${port}/docs`);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map