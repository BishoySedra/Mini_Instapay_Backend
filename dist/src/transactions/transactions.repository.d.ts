import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class TransactionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserTransactions(userId: string): Promise<({
        receiver: {
            name: string;
        };
        senderBankAccount: {
            accountNumber: string;
        };
        receiverBankAccount: {
            accountNumber: string;
        };
        sender: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        receiverId: string;
        senderBankAccountId: string;
        receiverBankAccountId: string;
        senderId: string;
    })[]>;
    createTransaction(data: any, prisma: any): Promise<any>;
    createTransaction(data: any): Promise<any>;
    updateTransactionStatus(transactionId: string, status: TransactionStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        receiverId: string;
        senderBankAccountId: string;
        receiverBankAccountId: string;
        senderId: string;
    }>;
    findRefundRequests(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        receiverId: string;
        senderBankAccountId: string;
        receiverBankAccountId: string;
        senderId: string;
    }[]>;
    findTransactionById(transactionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        receiverId: string;
        senderBankAccountId: string;
        receiverBankAccountId: string;
        senderId: string;
    }>;
    findBankAccountByAccNumber(senderAccountNumber: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }>;
    findUserById(id: any): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        phone: string;
        address: string;
        dailyLimit: number;
        dailyTransactionTotal: number;
        lastTransactionDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isAdmin: boolean;
        isActive: boolean;
    }>;
    incrementAccountBalance(prisma: any, accountNumber: any, amount: any): Promise<void>;
    decrementAccountBalance(prisma: any, accountNumber: any, amount: any): Promise<void>;
    updateUserDailyTransaction(prisma: any, id: any, amount: any): Promise<void>;
    makeTransactionNotification(notificationsService: any, sender: any, receiver: any, amount: any, type: any): Promise<void>;
}
