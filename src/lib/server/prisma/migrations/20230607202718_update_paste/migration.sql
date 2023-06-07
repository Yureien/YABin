/*
  Warnings:

  - You are about to drop the column `uniqueId` on the `Paste` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Paste` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Paste_uniqueId_key";

-- AlterTable
ALTER TABLE "Paste" DROP COLUMN "uniqueId",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "readCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Paste_key_key" ON "Paste"("key");
