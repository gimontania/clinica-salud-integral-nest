import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService],
  //exportamos PacienteSErvice para que otros modulos puedan utilizarlo
  exports: [PacientesService],
})
export class PacientesModule {}
