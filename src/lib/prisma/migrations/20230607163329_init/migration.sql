-- CreateTable
CREATE TABLE "Paste" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uniqueId" TEXT NOT NULL,
    "authorIp" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "expiresCount" INTEGER,

    CONSTRAINT "Paste_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paste_uniqueId_key" ON "Paste"("uniqueId");
