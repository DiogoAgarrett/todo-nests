import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validação global (para DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Mini Todo API')
    .setDescription('API simples de tarefas em NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
