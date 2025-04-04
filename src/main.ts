import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const config = new DocumentBuilder()
  .setTitle('Prodix API')
  .setDescription('The Prodix API')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.setGlobalPrefix('api');

  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
