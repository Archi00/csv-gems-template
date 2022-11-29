-- CreateTable
CREATE TABLE "cat-tmp-gems" (
    "ID" TEXT NOT NULL,
    "Active" BIGINT,
    "Categories" TEXT,
    "Price" BIGINT,
    "Reference" TEXT,
    "Quantity" BIGINT,
    "Name" TEXT,
    "Description" TEXT,
    "ShortDescription" TEXT,
    "meta-title" TEXT,
    "meta-description" TEXT,
    "imgUrls" TEXT,
    "imgAlts" TEXT,

    CONSTRAINT "tmp-gems_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "en-tmp-gems" (
    "ID" TEXT NOT NULL,
    "Active" BIGINT,
    "Categories" TEXT,
    "Price" BIGINT,
    "Reference" TEXT,
    "Quantity" BIGINT,
    "Name" TEXT,
    "Description" TEXT,
    "ShortDescription" TEXT,
    "meta-title" TEXT,
    "meta-description" TEXT,

    CONSTRAINT "en-tmp-gems_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "es-tmp-gems" (
    "ID" TEXT NOT NULL,
    "Active" BIGINT,
    "Categories" TEXT,
    "Price" BIGINT,
    "Reference" TEXT,
    "Quantity" BIGINT,
    "Name" TEXT,
    "Description" TEXT,
    "ShortDescription" TEXT,
    "meta-title" TEXT,
    "meta-description" TEXT,

    CONSTRAINT "es-tmp-gems_pkey" PRIMARY KEY ("ID")
);
