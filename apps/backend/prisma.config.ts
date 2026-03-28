import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "app/packages/db/prisma/Schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
