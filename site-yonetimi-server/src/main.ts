import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Aidat Takip Programı')
    .setDescription('Aidat Takip Programı API')
    .setVersion('1.0')
    .addTag('aidattakip')
    // .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('openapi', app, document);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
