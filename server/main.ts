import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
