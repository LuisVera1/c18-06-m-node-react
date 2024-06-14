/*
  Warnings:

  - The values [Passed,Failed,Conditional,Repeated] on the enum `StatusSubject` will be removed. If these variants are still used in the database, this will fail.
  - The values [Active,Inactive,Graduate,Certificate,DroppingOut,TempWithdraw] on the enum `StudentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Active,Inactive] on the enum `TeacherStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "AdminStatus" AS ENUM ('Activo', 'Inactivo', 'Baja');

-- AlterEnum
BEGIN;
CREATE TYPE "StatusSubject_new" AS ENUM ('Aprobada', 'Reprobada', 'Extraordinario', 'Repetida');
ALTER TABLE "Subject" ALTER COLUMN "status" TYPE "StatusSubject_new" USING ("status"::text::"StatusSubject_new");
ALTER TYPE "StatusSubject" RENAME TO "StatusSubject_old";
ALTER TYPE "StatusSubject_new" RENAME TO "StatusSubject";
DROP TYPE "StatusSubject_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StudentStatus_new" AS ENUM ('Activo', 'Inactivo', 'Graduado', 'Titulado', 'Baja', 'BajaTemporal');
ALTER TABLE "Student" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Student" ALTER COLUMN "status" TYPE "StudentStatus_new" USING ("status"::text::"StudentStatus_new");
ALTER TYPE "StudentStatus" RENAME TO "StudentStatus_old";
ALTER TYPE "StudentStatus_new" RENAME TO "StudentStatus";
DROP TYPE "StudentStatus_old";
ALTER TABLE "Student" ALTER COLUMN "status" SET DEFAULT 'Activo';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TeacherStatus_new" AS ENUM ('Activo', 'Inactivo', 'Baja');
ALTER TABLE "Teacher" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Teacher" ALTER COLUMN "status" TYPE "TeacherStatus_new" USING ("status"::text::"TeacherStatus_new");
ALTER TYPE "TeacherStatus" RENAME TO "TeacherStatus_old";
ALTER TYPE "TeacherStatus_new" RENAME TO "TeacherStatus";
DROP TYPE "TeacherStatus_old";
ALTER TABLE "Teacher" ALTER COLUMN "status" SET DEFAULT 'Activo';
COMMIT;

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" "AdminStatus" NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "status" SET DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "status" SET DEFAULT 'Activo';

-- CreateTable
CREATE TABLE "ProfileTeacher" (
    "id" SERIAL NOT NULL,
    "birthdate" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "grade" TEXT,
    "specialization" TEXT,
    "department" TEXT,
    "expertise" TEXT,
    "contact" TEXT,
    "contactPhone" TEXT,
    "teacherID" INTEGER NOT NULL,

    CONSTRAINT "ProfileTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileStudent" (
    "id" SERIAL NOT NULL,
    "birthdate" TEXT,
    "phone" TEXT,
    "year" INTEGER,
    "currentCycle" TEXT,
    "contact" TEXT,
    "contactPhone" TEXT,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "ProfileStudent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTeacher_teacherID_key" ON "ProfileTeacher"("teacherID");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileStudent_studentID_key" ON "ProfileStudent"("studentID");

-- AddForeignKey
ALTER TABLE "ProfileTeacher" ADD CONSTRAINT "ProfileTeacher_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileStudent" ADD CONSTRAINT "ProfileStudent_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
