import { Global, Module } from "@nestjs/common";
import { PrismaService }from "./prisma.service";

//módulo global para poder uar prisma desde cualquier módulo
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaModule {}