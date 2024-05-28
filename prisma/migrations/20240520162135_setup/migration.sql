-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Teacher', 'Admin');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Active', 'Inactive', 'Graduate', 'Certificate');

-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "StudentStatus" NOT NULL DEFAULT 'Inactive',
    "lastLogin" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'Student',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "TeacherStatus" NOT NULL DEFAULT 'Active',
    "lastLogin" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'Teacher',

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "Role" "Role" NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "code" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "score" INTEGER,
    "year" INTEGER,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_code_key" ON "Teacher"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_code_key" ON "Admin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
