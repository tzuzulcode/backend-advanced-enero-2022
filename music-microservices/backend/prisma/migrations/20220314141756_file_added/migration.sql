-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "fileId" INTEGER;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
