-- CreateTable
CREATE TABLE "DownloadList" (
    "key" SERIAL NOT NULL,
    "Species" VARCHAR(255) NOT NULL,
    "Genome" VARCHAR(255),
    "GFF" VARCHAR(50),
    "CDS" VARCHAR(50),
    "mRNA" VARCHAR(50),
    "Protein" VARCHAR(50),

    CONSTRAINT "DownloadList_pkey" PRIMARY KEY ("key")
);
