import { PartialType } from "@nestjs/mapped-types";
import { CreateMedicoDto } from "./create-medico.dto";

//convierte todos los campos en opcionales
export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {}