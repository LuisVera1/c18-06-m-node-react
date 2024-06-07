-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "careerID" INTEGER;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_careerID_fkey" FOREIGN KEY ("careerID") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;
