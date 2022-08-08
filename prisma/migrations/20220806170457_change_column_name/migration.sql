/*
  Warnings:

  - You are about to drop the column `quatity` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quatity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
