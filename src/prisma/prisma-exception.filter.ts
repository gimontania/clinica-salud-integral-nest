import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, NotFoundException, } from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";

//este filtro captura los errores conocidos que lanza prisma
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        //obtenemos la respuesta http para poder enviar el error
        const response = host.switchToHttp().getResponse();

        switch (exception.code) {

            //P2002 -> valor único duplicado
            case 'P2002': {
                const error = new ConflictException(
                    'Ya existe un registro con ese valor único',
                );
        
                return response
                    .status(error.getStatus())
                    .json(error.getResponse());
            }    

            //P2025 -> no existe el registro que se queria modificar/eliminar
            case 'P2025': {
                const error = new NotFoundException(
                    'Registro no encontrado',
                );

                return response
                .status(error.getStatus())
                .json(error.getResponse());
            }
                               
             //si es otro error de prisma, dejamos que siga su camino   
             default:
                throw exception;
        }
    }
}    