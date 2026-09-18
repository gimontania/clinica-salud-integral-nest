import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MedicosService } from "./medicos.service";
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';


//controlador encargado de las rutas de médicos
@Controller('medicos')
export class MedicosController {
    constructor(private readonly medicosService: MedicosService) {}

    //get, medicos -> obtiene todos los médicos
    @Get()
    findAll() {
        return this.medicosService.findAll();
    }

    //get, medicos/:id -> busca un médico por su id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const medico = await this.medicosService.findOne(Number(id));

        //404, si no existe
        if (!medico) {
            throw new NotFoundException('Médico no encontrado');
        }

        return medico;
    }

    //post, medicos -> crea un nuevo médico
    @Post()
    create(@Body() dto: CreateMedicoDto) {
        return this.medicosService.create(dto);
    }

    //put, medicos/:id -> actualiza un médico
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateMedicoDto) {
        const medico = await this.medicosService.findOne(Number(id));

        //404 si no existe
        if (!medico) {
            throw new NotFoundException('Médico no encontrado');
        }

        return this.medicosService.update(Number(id), dto);
    }

    //delte. medicos/:id -> elimina un médico
    @Delete(':id')
    async remove (@Param('id') id: string) {
        const medico = await this.medicosService.findOne(Number(id));

        //404 si no existe
        if (!medico) {
            throw new NotFoundException('Medico no encontrado');
        }

        return this.medicosService.remove(Number(id));
    }


}
