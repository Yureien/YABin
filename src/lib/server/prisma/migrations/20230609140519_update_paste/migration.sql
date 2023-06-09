/*
  Warnings:

  - You are about to alter the column `key` on the `Paste` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `language` on the `Paste` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "Paste" ADD COLUMN     "initVector" VARCHAR(64),
ALTER COLUMN "key" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "language" SET DATA TYPE VARCHAR(64);

-- CreateIndex
CREATE INDEX "Paste_key_idx" ON "Paste"("key");
