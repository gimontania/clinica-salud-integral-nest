import { Controller, Get } from '@nestjs/common';
import { MedicosService } from "./medicos.service";


//controlador encargado de las rutas de médicos
@Controller('medicos')
export class MedicosController {
    constructor(private readonly medicosService: MedicosService) {}

    //get, medicos -> obtiene todos los médicos
    @Get()
    findAll() {
        return this.medicosService.findAll();
    }
}
