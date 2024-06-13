-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_carerrID_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "carerrID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_carerrID_fkey" FOREIGN KEY ("carerrID") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;
