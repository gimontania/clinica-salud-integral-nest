import { Body, Controller, Get, Post } from '@nestjs/common';
import { CitasService } from './citas.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCitaDto } from './dto/create-cita.dto';


@ApiTags('Citas')
@Controller('citas')
export class CitasController {
    constructor(private readonly citasService: CitasService) {}

        @ApiOperation({ summary: 'Crea una nueva cita'})
        @Post()
        create(
            @Body()
            body: CreateCitaDto,
        ) {
            //enviamos los datos al service para crear la cita
            return this.citasService.create({
                ...body,
                fecha: new Date(body.fecha),
            });
        }

        @ApiOperation({ summary: 'Lista todas las citas'})
        @Get()
        findAll() {
            //pedimos al service todas las citas
            return this.citasService.findAll();
        }
    }
    
















