import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

//servicio que permite usar prisma dentro de NestJS
@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        //conectamos prisma con postgresql usando DATABASE_URL
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL,
        });

        super({ adapter });
    }
}

