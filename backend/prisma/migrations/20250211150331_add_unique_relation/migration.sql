/*
  Warnings:

  - A unique constraint covering the columns `[receiverId,senderId]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "friendships_receiverId_senderId_key" ON "friendships"("receiverId", "senderId");
