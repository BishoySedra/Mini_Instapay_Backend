import { TransactionType } from '@prisma/client';
export declare class TransactionDTO {
    senderAccountNumber: string;
    receiverAccountNumber: string;
    amount: number;
    transactionType: TransactionType;
}
