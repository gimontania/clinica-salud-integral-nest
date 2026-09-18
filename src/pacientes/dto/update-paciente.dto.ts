import { PartialType } from "@nestjs/mapped-types";
import { CreatePacienteDto } from "./create-paciente.dto";


//convierte los campos en opcionales
export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {}