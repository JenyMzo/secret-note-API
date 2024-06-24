import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
    .setTitle('SecretNotes API')
    .setDescription('A node JS API to create, encrypt and handle notes for a single user.')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('notes')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  await app.listen(3000);
}
bootstrap();
