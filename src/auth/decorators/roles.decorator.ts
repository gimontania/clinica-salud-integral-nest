import { SetMetadata } from "@nestjs/common";

//permite indicar qué roles pueden acceder a una ruta
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);