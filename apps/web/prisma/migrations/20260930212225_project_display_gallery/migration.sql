-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "displayMode" TEXT NOT NULL DEFAULT 'both',
ADD COLUMN     "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[];
