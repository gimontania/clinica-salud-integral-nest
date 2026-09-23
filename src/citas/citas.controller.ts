import { Body, Controller, Get, Post } from '@nestjs/common';
import { CitasService } from './citas.service';


@Controller('citas')
export class CitasController {
    constructor(private readonly citasService: CitasService) {}

        @Post()
        create(
            @Body()
            body: {
                pacienteId: number;
                medicoId: number;
                fecha: Date;
            },
        ) {
            //enviamos los datos al service para crear la cita
            return this.citasService.create(body);
        }

        @Get()
        findAll() {
            //pedimos al service todas las citas
            return this.citasService.findAll();
        }
    }
















