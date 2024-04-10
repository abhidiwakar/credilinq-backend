-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "company_uen" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "person_name" TEXT NOT NULL,
    "position_in_company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "files" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);
