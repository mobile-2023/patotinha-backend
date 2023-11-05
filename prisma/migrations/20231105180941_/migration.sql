/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_gameId_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGameList" DROP CONSTRAINT "_GameToGameList_A_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "gameId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
ALTER COLUMN "gameId" DROP DEFAULT,
ALTER COLUMN "gameId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("gameId");
DROP SEQUENCE "Game_gameId_seq";

-- AlterTable
ALTER TABLE "_GameToGameList" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGameList" ADD CONSTRAINT "_GameToGameList_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;
