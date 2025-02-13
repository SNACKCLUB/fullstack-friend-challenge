/*
  Warnings:

  - You are about to drop the column `user_destination_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_source_id` on the `notifications` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationTypes" AS ENUM ('INVITE');

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_source_id_fkey";

-- DropIndex
DROP INDEX "notifications_user_source_id_user_destination_id_key";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "user_destination_id",
DROP COLUMN "user_source_id",
ADD COLUMN     "type" "NotificationTypes" NOT NULL DEFAULT 'INVITE';
