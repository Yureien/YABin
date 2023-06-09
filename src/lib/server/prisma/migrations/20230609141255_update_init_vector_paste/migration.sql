/*
  Warnings:

  - A unique constraint covering the columns `[initVector]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paste_initVector_key" ON "Paste"("initVector");
