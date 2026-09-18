import { Body, Controller, Delete,  Get, NotFoundException, Param, Post, Put, } from '@nestjs/common';
import { PacientesService } from './pacientes.service';


//controlador encargado de las rutas de pacientes
@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) {}

    //get, pacientes -> devuelve todos los pacientes
    @Get()
    findAll() {
        return this.pacientesService.findAll();
    }

    //get, pacientes/:id -> busca un paciente por su id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const paciente = await this.pacientesService.findOne(Number(id));

        //si no existe, nestjs responde automaticamente con 404
        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        return paciente;
    }

    //post, pacientes > crea un nuevo paciente
    @Post()
    create(@Body() body: any) {
        return this.pacientesService.create({
            ...body,
            fechaNacimiento: new Date(body.fechaNacimiento),            
        });
    }

    //put, pacientes/:id -> actualiza un paciente
    @Put(':id') 
    async update(@Param('id') id: string, @Body() body: any) {
        const paciente = await this.pacientesService.findOne(Number(id));

        //si no existe, respondemos 404
        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        return this.pacientesService.update(Number(id), {
            ...body,
            ...(body.fechaNacimiento && {
                fechaNacimiento: new Date(body.fechaNacimiento),
            }),
        });        
    }

    //delete, pacientes/:id -> elimina un paciente
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const paciente = await this.pacientesService.findOne(Number(id));

        //404, si no existe
        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        return this.pacientesService.remove(Number(id));
    }
}
