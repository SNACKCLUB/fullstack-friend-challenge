/*
  Warnings:

  - You are about to drop the column `user_destination_id` on the `friendships` table. All the data in the column will be lost.
  - You are about to drop the column `user_source_id` on the `friendships` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userSourceId,userDestinationId]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userDestinationId` to the `friendships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSourceId` to the `friendships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_user_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_user_source_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropIndex
DROP INDEX "friendships_user_source_id_user_destination_id_key";

-- AlterTable
ALTER TABLE "friendships" DROP COLUMN "user_destination_id",
DROP COLUMN "user_source_id",
ADD COLUMN     "userDestinationId" TEXT NOT NULL,
ADD COLUMN     "userSourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "friendships_userSourceId_userDestinationId_key" ON "friendships"("userSourceId", "userDestinationId");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_userSourceId_fkey" FOREIGN KEY ("userSourceId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_userDestinationId_fkey" FOREIGN KEY ("userDestinationId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
