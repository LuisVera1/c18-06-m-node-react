-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "createAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "manageUsers" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "superAdmin" BOOLEAN NOT NULL DEFAULT false;
