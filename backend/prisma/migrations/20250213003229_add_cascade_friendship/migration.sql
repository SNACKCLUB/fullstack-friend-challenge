-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_friendshipId_fkey";

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "friendships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
