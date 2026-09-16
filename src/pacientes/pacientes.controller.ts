import { Controller, Get } from '@nestjs/common';
import { PacientesService } from './pacientes.service';


//controlador encargado de las rutas de pacientes
@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) {}

    //get, pacientes -> obtiene todos los pacientes
    @Get()
    findAll() {
        return this.pacientesService.findAll();
    }
}
