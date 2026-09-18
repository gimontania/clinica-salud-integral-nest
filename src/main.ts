import "dotenv/config"; // carga las variables del archivo .env
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //activa la validacion de los dto en toda la aplicacion
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos que no están definidos en el dto
      transform: true, //transforma los datos recibidos al tipo del dto
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000); //inicia el servidor
}

void bootstrap();
