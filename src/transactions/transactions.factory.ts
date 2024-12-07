// src/transactions/transaction.factory.ts
import { Injectable } from '@nestjs/common';
import { TransactionType, TransactionStatus } from '@prisma/client';

@Injectable()
export class TransactionFactory {
  createTransaction(
    senderId: string,
    receiverId: string,
    senderBankAccountId: string,
    receiverBankAccountId: string,
    amount: number,
    type: TransactionType,
    status: TransactionStatus,
  ) {
    return {
      sender: { connect: { id: senderId } },
      receiver: { connect: { id: receiverId } },
      senderBankAccount: { connect: { id: senderBankAccountId } },
      receiverBankAccount: { connect: { id: receiverBankAccountId } },
      amount,
      type,
      status,
    };
  }
}
