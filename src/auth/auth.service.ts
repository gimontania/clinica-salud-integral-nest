import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../generated/prisma/client';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) {}
    
    //registra un usuario nuevo
    async register(email: string, password: string, role: Role) {
        //convertimos la contraseña en un hash antes de guardarla
        const passwordHash = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: { 
                email,
                password: passwordHash,
                role,
            },
            //nunca devolvemos la contraseña al cliente
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    }

    //inicia sesión y genera un jwt
    async login(email: string, password: string) {
        //buscamos al usuario por email
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        //verificamos que exista y que coincida la contraseña
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        //generamos el token con los datos necesarios
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            this.configService.get<string>('JWT_SECRET') as string,
            { expiresIn: '8h' },
        );

        return { token };
    }   

}

