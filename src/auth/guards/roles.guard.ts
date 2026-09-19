import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        //obtenemos los roles permitidos en la ruta
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );

        //si la ruta no tiene roles definidos, permitimos el acceso
        if (!requiredRoles) return true;

        //obtenemos el usuario que JwtAuthGuard guardó en request.user
        const { user } = context.switchToHttp().getRequest();

        //verificamos que exista el usuario y que tenga uno de los roles permitidos
        if (!user || !requiredRoles.includes(user.role)){
            throw new ForbiddenException(
                'No tienes permiso para acceder a este recurso',
            );
        }

        return true;
    }
}