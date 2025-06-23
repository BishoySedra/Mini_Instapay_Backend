import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class AdminRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findPaginatedUsers(skip: number, take: number): Promise<{
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
    }[]>;
    countUsers(): Promise<number>;
    findAllBankAccounts(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }[]>;
    updateUserStatus(userId: string, isActive: boolean): Promise<{
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
    findUserBankAccounts(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }[]>;
    findPaginatedTransactions(skip: number, take: number): Promise<({
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
    findPendingTransactions(): Promise<{
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
    findAllTransactions(): Promise<{
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
}
