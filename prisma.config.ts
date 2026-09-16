import "dotenv/config";
import { defineConfig, env } from "prisma/config";

//configuración de prisma 7
export default defineConfig({
    schema: "prisma/schema.prisma",

    //ubicación de las migraciones
    migrations: {
        path: "prisma/migrations"
    },

    //tomamos la conexión desde .env
    datasource: {
        url: env ("DATABASE_URL"),
    },
});