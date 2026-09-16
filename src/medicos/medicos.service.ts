import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";


//servicio encargado de consultar los médicos
@Injectable()
export class MedicosService {
    constructor(private readonly prisma: PrismaService) {}

    //obtiene todos los médicos de la db
    findAll() {
        return this.prisma.medico.findMany();
    }
}
