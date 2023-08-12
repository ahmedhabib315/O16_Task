import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Create a Swagger document builder
  const config = new DocumentBuilder()
    .setTitle('O16 Labs task')
    .setDescription('User Authorization, Authentication and CRUD with Post')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger UI at /api-docs
  SwaggerModule.setup('api-docs', app, document);


  await app.listen(3000);
}
bootstrap();
