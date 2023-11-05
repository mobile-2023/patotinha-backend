/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.
  - Added the required column `apiReference` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishedAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "id",
DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "apiReference" TEXT NOT NULL,
ADD COLUMN     "finishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gameId" SERIAL NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("gameId");

-- CreateTable
CREATE TABLE "GameList" (
    "listId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameList_pkey" PRIMARY KEY ("listId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "_GameToGameList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_key" ON "Comment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_gameId_key" ON "Comment"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGameList_AB_unique" ON "_GameToGameList"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGameList_B_index" ON "_GameToGameList"("B");

-- AddForeignKey
ALTER TABLE "GameList" ADD CONSTRAINT "GameList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGameList" ADD CONSTRAINT "_GameToGameList_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGameList" ADD CONSTRAINT "_GameToGameList_B_fkey" FOREIGN KEY ("B") REFERENCES "GameList"("listId") ON DELETE CASCADE ON UPDATE CASCADE;
