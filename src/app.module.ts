import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from "./prisma/prisma.module";
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { AuthModule } from './auth/auth.module';


//modulo principal de la aplicación
@Module({
  imports: [PrismaModule, PacientesModule, MedicosModule, AuthModule], //registramos prisma para usarlo en la aplicación
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
