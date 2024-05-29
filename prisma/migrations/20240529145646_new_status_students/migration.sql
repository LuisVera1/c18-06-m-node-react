/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Career` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "StudentStatus" ADD VALUE 'DroppingOut';
ALTER TYPE "StudentStatus" ADD VALUE 'TempWithdraw';

-- CreateIndex
CREATE UNIQUE INDEX "Career_code_key" ON "Career"("code");
