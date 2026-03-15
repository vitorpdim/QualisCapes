-- CreateTable
CREATE TABLE "periodicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issn" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "areaAvaliacao" TEXT NOT NULL,
    "estrato" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "periodicos_issn_idx" ON "periodicos"("issn");

-- CreateIndex
CREATE INDEX "periodicos_titulo_idx" ON "periodicos"("titulo");
