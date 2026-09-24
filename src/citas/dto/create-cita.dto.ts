import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";


export class CreateCitaDto {
    //id del paciente que tendrá la cita
    @ApiProperty({ example: 1})
    @IsInt()
    @IsNotEmpty()
    pacienteId: number;

    //id del médico que atenderá la cita
    @ApiProperty({ example: 1})
    @IsInt()
    @IsNotEmpty()
    medicoId: number;

    //fecha y hora de la cita
    @ApiProperty({ example: '2026-09-25T10:30:00.000Z'})
    @IsDateString()
    @IsNotEmpty()
    fecha: string;

}