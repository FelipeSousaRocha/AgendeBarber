/*
  Warnings:

  - You are about to alter the column `price` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
