// app/packages/db/Prisma.ts
import { PrismaClient } from "./prisma/generated/prisma/client"; // لاحظ المسار الجديد
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
