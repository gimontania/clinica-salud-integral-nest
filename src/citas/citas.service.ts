import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PacientesService } from '../pacientes/pacientes.service';


@Injectable()
export class CitasService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly pacientesService: PacientesService,
    ){}

    async create(data: {
        pacienteId: number;
        medicoId: number,
        fecha: Date,          
    }) {
        //buscamos el paciente usando el service de pacientes
        const paciente = await this.pacientesService.findOne(data.pacienteId);

        //404, si el paciente no existe
        if (!paciente) {
            throw new NotFoundException('El paciente no existe');
        }

        //creamos la cita
        return this.prisma.cita.create({
            data,
        });
    }

    findAll(){
        //buscamos todas las citas
        return this.prisma.cita.findMany();
    }
}
