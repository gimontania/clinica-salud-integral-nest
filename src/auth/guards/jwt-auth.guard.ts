import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';



@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        //obtenemos la petición http
        const request = context.switchToHttp().getRequest();

        //buscamos el header Authorization
        const header = request.headers.authorization;

        //verificamos que exista y tenga el formato bearer
        if (!header || !header.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        try{
            //verificamos el jwt y guardamos su contenido en request.user
            request.user = jwt.verify(
                header.split(' ')[1],
                this.configService.get<string>('JWT_SECRET') as string,
            );

            return true;            
        }catch {
            //si el token es inválido o expiró
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}
