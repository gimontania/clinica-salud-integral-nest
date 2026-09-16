import "dotenv/config"; // carga las variables del archivo .env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); //inicia el servidor
}

void bootstrap();
