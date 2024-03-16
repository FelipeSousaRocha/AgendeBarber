/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_id_key" ON "Barbershop"("id");
