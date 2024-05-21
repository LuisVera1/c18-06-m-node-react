/*
  Warnings:

  - You are about to drop the column `Role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "Role",
DROP COLUMN "lastLogin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Admin';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "lastLogin",
ALTER COLUMN "status" SET DEFAULT 'Active';

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "lastLogin";
