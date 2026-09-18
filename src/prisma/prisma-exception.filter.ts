import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, NotFoundException, } from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";

//este filtro captura los errores conocidos que lanza prisma
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        switch (exception.code) {

            //P2002 -> valor único duplicado
            case 'P2002':
                return new ConflictException(
                    'Ya existe un registro con ese valor único',
                ).getResponse();

            //P2025 -> no existe el registro que se queria modificar/eliminar
            case 'P2025':
                return new NotFoundException(
                    'Registro no encontrado',
                ).getResponse();
                
             //si es otro error de prisma, dejamos que siga su camino   
             default:
                throw exception;
        }
    }
}    