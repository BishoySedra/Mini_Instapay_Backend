import { TransactionType, TransactionStatus } from '@prisma/client';
export declare class TransactionFactory {
    createTransaction(senderId: string, receiverId: string, senderBankAccountId: string, receiverBankAccountId: string, amount: number, type: TransactionType, status: TransactionStatus): {
        sender: {
            connect: {
                id: string;
            };
        };
        receiver: {
            connect: {
                id: string;
            };
        };
        senderBankAccount: {
            connect: {
                id: string;
            };
        };
        receiverBankAccount: {
            connect: {
                id: string;
            };
        };
        amount: number;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
    };
}
