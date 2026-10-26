-- AlterTable
ALTER TABLE "Experience" ADD COLUMN "description" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Experience" ALTER COLUMN "description" DROP DEFAULT;
ALTER TABLE "Experience" DROP COLUMN "bullets";
