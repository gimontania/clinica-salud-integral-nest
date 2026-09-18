import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePacienteDto {
    //el nombre debe ser texto y no puede estar vacío
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
    
        //la fecha debe tener un formato de fecha válida
        @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
        fechaNacimiento: string;    
}