-- CreateTable
CREATE TABLE "balances" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_store_id_balance" ON "balances"("store_id");

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
