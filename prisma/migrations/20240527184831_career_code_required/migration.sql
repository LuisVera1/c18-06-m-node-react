/*
  Warnings:

  - Made the column `code` on table `Career` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Career" ALTER COLUMN "code" SET NOT NULL;
