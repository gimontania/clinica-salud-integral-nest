import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreatePacienteDto {
    //el nombre debe ser texto y no puede estar vacío
        @ApiProperty({ example: 'Jose'})
        @IsString()
        @IsNotEmpty({ message: 'El nombre es obligatorio' })
        firstName: string;
    
        //apellido: debe ser texto y no puede estar vacío
        @ApiProperty({ example: 'Eisbruch' })
        @IsString()
        @IsNotEmpty({ message: 'El apellido es obligatorio' })
        lastName: string;
    
        //email debe tener un formato válido
        @ApiProperty({ example: 'juan@email.com' })
        @IsEmail({}, { message: 'El correo no tiene un formato válido' })
        email: string;
    
        //la fecha debe tener un formato de fecha válida
        @ApiProperty({ example: '2000-01-15'})
        @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
        fechaNacimiento: string;    
}