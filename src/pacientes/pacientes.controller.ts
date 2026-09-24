import { Body, Controller, Delete,  Get, NotFoundException, Param, Post, Put, } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';



//controlador encargado de las rutas de pacientes
@ApiTags('Pacientes')
@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) {}

    //get, pacientes -> devuelve todos los pacientes
    @ApiOperation({ summary: 'Lista todos los pacientes' })
    @Get()
    findAll() {
        return this.pacientesService.findAll();
    }

    //get, pacientes/:id -> busca un paciente por su id
    @ApiOperation({ summary: 'Busca un paciente por su ID'})
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
    @ApiOperation({ summary: 'Crea un nuevo paciente' })
    @Post()
    create(@Body() dto: CreatePacienteDto) {
        return this.pacientesService.create({
            ...dto,
            fechaNacimiento: new Date(dto.fechaNacimiento),            
        });
    }

    //put, pacientes/:id -> actualiza un paciente
    @ApiOperation({ summary: 'Actualiza un paciente por su Id'})
    @Put(':id') 
    async update(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
        const paciente = await this.pacientesService.findOne(Number(id));

        //si no existe, respondemos 404
        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        //separamos la fecha del resto de los datos
        const { fechaNacimiento, ...datos } = dto;

        return this.pacientesService.update(Number(id), {
            ...datos,
            //convertimos la fecha de string a Date
            ...(fechaNacimiento && {
                fechaNacimiento: new Date(fechaNacimiento),
            }),
        });        
    }

    //delete, pacientes/:id -> elimina un paciente
    @ApiOperation({ summary: 'Elimina un paciente por su Id'})
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
