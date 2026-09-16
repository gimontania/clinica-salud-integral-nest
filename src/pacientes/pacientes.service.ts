import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";


//servicio encargado de consultar los pacientes
@Injectable()
export class PacientesService {
    constructor(private readonly prisma: PrismaService) {}

    //obtiene todos los pacientes de la db
    findAll() {
        return this.prisma.paciente.findMany();
    }
}
