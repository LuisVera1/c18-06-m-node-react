/*
  Warnings:

  - You are about to drop the column `code` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `career` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Careers" AS ENUM ('Artes', 'Biologia', 'Psicologia', 'IngSisComp', 'Electronica');

-- DropIndex
DROP INDEX "Admin_code_key";

-- DropIndex
DROP INDEX "Student_code_key";

-- DropIndex
DROP INDEX "Teacher_code_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "code",
ADD COLUMN     "career" "Careers" NOT NULL,
ADD COLUMN     "plan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "code";
