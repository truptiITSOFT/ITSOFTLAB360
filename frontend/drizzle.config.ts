import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/utils/db/schema/*.ts",
    out: "./src/utils/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});