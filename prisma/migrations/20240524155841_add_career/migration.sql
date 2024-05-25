/*
  Warnings:

  - You are about to drop the column `career` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Subjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `carerrID` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `careerID` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusSubject" AS ENUM ('Passed', 'Failed', 'Conditional', 'Repeated');

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "carerrID" INTEGER NOT NULL,
ADD COLUMN     "credits" INTEGER NOT NULL,
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "spaces" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "teacherID" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "career",
ADD COLUMN     "careerID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Subjects";

-- DropEnum
DROP TYPE "Careers";

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "startH" INTEGER NOT NULL,
    "endH" INTEGER NOT NULL,
    "classroom" TEXT NOT NULL,
    "classID" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsInClass" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "classID" INTEGER NOT NULL,

    CONSTRAINT "StudentsInClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "status" "StatusSubject" NOT NULL,
    "score" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "careerID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_carerrID_fkey" FOREIGN KEY ("carerrID") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsInClass" ADD CONSTRAINT "StudentsInClass_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsInClass" ADD CONSTRAINT "StudentsInClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_careerID_fkey" FOREIGN KEY ("careerID") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_careerID_fkey" FOREIGN KEY ("careerID") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
