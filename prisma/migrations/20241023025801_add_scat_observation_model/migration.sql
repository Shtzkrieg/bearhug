-- CreateTable
CREATE TABLE "ScatObservation" (
    "id" SERIAL NOT NULL,
    "bearId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,
    "consistency" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScatObservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScatObservation" ADD CONSTRAINT "ScatObservation_bearId_fkey" FOREIGN KEY ("bearId") REFERENCES "Bear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
