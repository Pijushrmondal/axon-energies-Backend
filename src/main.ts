import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerPath = 'api';
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port);

  const url = await app.getUrl();

  console.log(`App running on: ${url}`);
  console.log(` Swagger docs: ${url}/${swaggerPath}`);
}
bootstrap();
