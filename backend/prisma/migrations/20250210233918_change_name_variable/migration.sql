/*
  Warnings:

  - You are about to drop the column `userDestinationId` on the `friendships` table. All the data in the column will be lost.
  - You are about to drop the column `userSourceId` on the `friendships` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `friendships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `friendships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendshipId` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_userDestinationId_fkey";

-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_userSourceId_fkey";

-- DropIndex
DROP INDEX "friendships_userSourceId_userDestinationId_key";

-- AlterTable
ALTER TABLE "friendships" DROP COLUMN "userDestinationId",
DROP COLUMN "userSourceId",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "friendshipId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "friendships_senderId_receiverId_key" ON "friendships"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "friendships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
