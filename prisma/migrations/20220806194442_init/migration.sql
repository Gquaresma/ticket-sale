/*
  Warnings:

  - You are about to drop the column `eventID` on the `Order` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_eventID_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "eventID",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
