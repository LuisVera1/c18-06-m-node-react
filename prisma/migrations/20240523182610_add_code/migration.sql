/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "code" INTEGER;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "code" INTEGER;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "code" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_code_key" ON "Admin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_code_key" ON "Teacher"("code");
