/*
  Warnings:

  - You are about to drop the column `genreId` on the `Song` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_genreId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "genreId";

-- CreateTable
CREATE TABLE "GenresSongs" (
    "idGenre" INTEGER NOT NULL,
    "idSong" INTEGER NOT NULL,

    CONSTRAINT "GenresSongs_pkey" PRIMARY KEY ("idGenre","idSong")
);

-- AddForeignKey
ALTER TABLE "GenresSongs" ADD CONSTRAINT "GenresSongs_idGenre_fkey" FOREIGN KEY ("idGenre") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresSongs" ADD CONSTRAINT "GenresSongs_idSong_fkey" FOREIGN KEY ("idSong") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
