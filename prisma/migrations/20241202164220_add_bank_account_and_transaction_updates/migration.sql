/*
  Warnings:

  - Added the required column `receiverBankAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderBankAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "receiverBankAccountId" TEXT NOT NULL,
ADD COLUMN     "senderBankAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderBankAccountId_fkey" FOREIGN KEY ("senderBankAccountId") REFERENCES "BankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverBankAccountId_fkey" FOREIGN KEY ("receiverBankAccountId") REFERENCES "BankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
