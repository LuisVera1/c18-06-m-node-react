/*
  Warnings:

  - You are about to drop the column `classroom` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "credits" DROP NOT NULL,
ALTER COLUMN "section" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "classroom";
