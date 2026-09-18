import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";


//servicio encargado de consultar los pacientes
@Injectable()
export class PacientesService {
    constructor(private readonly prisma: PrismaService) {}

    //get, pacientes -> devuelve todos los pacientes
    findAll() {
        return this.prisma.paciente.findMany();
    }

    //get, pacientes/:id -> busca un paciente por su id
    findOne(id: number) {
        return this.prisma.paciente.findUnique({
            where: { id},
        })
    }

    //post, pacientes -> crea un nuevo paciente
    create(data: {
        firstName: string
        lastName: string
        email: string
        fechaNacimiento: Date
    }) {
        return this.prisma.paciente.create({
            data,
        })
    }

    //put, pacientes/:id -> actualiza un paciente existente
    update(
        id: number,
        data: {
            firstName?: string
            lastName?: string
            email?: string
            fechaNacimiento?: Date
        },
    ) {
        return this.prisma.paciente.update({
            where: { id },
            data,
        })
    }

    //delete, pacientes/:id -> elimina un paciente
    remove(id: number) {
        return this.prisma.paciente.delete({
            where: { id },
        })
    }
}
