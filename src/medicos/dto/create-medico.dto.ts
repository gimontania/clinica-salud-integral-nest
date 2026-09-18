import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateMedicoDto {
    //nombre: debe ser texto y no puede estar vacío
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    firstName: string;

    //apellido: debe ser texto y no puede estar vacío
    @IsString()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    lastName: string;

    //email debe tener un formato válido
    @IsEmail({}, { message: 'El correo no tiene un formato válido' })
    email: string;

    //especialidadId debe ser un número entero
    @IsInt({ message: 'La especialidad debe ser un número entero' })
    especialidadId: number;
}