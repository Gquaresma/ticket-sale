-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_eventID_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
