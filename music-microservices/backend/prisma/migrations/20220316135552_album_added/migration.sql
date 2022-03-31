-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "albumId" INTEGER;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
