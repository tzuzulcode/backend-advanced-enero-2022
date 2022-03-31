/*
  Warnings:

  - You are about to drop the column `genre` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "genre",
ADD COLUMN     "genreId" INTEGER;

-- CreateTable
CREATE TABLE "Coauthors" (
    "idAuthor" INTEGER NOT NULL,
    "idSong" INTEGER NOT NULL,

    CONSTRAINT "Coauthors_pkey" PRIMARY KEY ("idAuthor","idSong")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "idAuthor" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coauthors" ADD CONSTRAINT "Coauthors_idAuthor_fkey" FOREIGN KEY ("idAuthor") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coauthors" ADD CONSTRAINT "Coauthors_idSong_fkey" FOREIGN KEY ("idSong") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_idAuthor_fkey" FOREIGN KEY ("idAuthor") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
