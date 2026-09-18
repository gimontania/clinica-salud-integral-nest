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

    //get, medicos/:id -> busca un médico por su id
    findOne(id: number) {
        return this.prisma.medico.findUnique({
            where: { id },
        });
    }

    //post, medicos -> crea un nuevo medico

    create(data: {
        firstName: string
        lastName: string
        email: string
        especialidadId: number
    }) {
        return this.prisma.medico.create({
            data,
        });
    }

    //put, medicos/:id -> actualiza un médico existente
    update(
        id: number,
        data: {
            firstName?: string
            lastName?: string
            email?: string
            especialidadId?: number
        },
    ) {
        return this.prisma.medico.update({
            where: { id },
            data,
        });
    }

    //delete, medicos/:id -> elimina un médico
    remove(id: number) {
        return this.prisma.medico.delete({
            where: { id },            
        });
    }
}
