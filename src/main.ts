import "dotenv/config"; // carga las variables del archivo .env
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from "./prisma/prisma-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoggingInterceptor } from "./common/logging.interceptor";
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configura la información y seguridad de swagger
  const config = new DocumentBuilder()
    .setTitle('Clínica Salud Integral')
    .setDescription('API de la clínica. migrada a NestJs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    //genera la documentación de la API
    const document = SwaggerModule.createDocument(app, config);

    //expone swagger en api/docs
    SwaggerModule.setup('api/docs', app, document);

    //activa la validación de los dto en toda la aplicación
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //elimina campos que no estén definidos en el dto
        transform: true, //transforma los datos recibidos al tipo de dto
      }),
    );

    
  //registra el filtro para manejar errores conocidos de prisma
  app.useGlobalFilters(new PrismaExceptionFilter());

  //registra el interceptor de loggin para todas las peticiones
  app.useGlobalInterceptors(new LoggingInterceptor());

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT') ?? 3000); //inicia el servidor
  
}

void bootstrap();
