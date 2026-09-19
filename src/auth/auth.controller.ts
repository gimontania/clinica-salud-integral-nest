import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '../../generated/prisma/client';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //registra un usuario nuevo
    @Post('register')
    register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: Role,
    ) {
        return this.authService.register(email, password, role);
    }

    //inicia sesión y devuelve un JWT
    @Post('login')
    login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(email, password);
    }
}
