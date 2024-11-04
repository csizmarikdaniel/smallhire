-- DropIndex
DROP INDEX "Image_userId_key";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN "profileImage" BOOLEAN DEFAULT false;
