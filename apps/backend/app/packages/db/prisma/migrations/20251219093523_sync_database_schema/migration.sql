-- CreateEnum
CREATE TYPE "satuts" AS ENUM ('ACTIVE', 'NOT_ACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "satuts" NOT NULL DEFAULT 'ACTIVE';
