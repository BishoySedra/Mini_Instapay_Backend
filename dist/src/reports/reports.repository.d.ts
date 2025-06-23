import { PrismaService } from 'prisma/prisma.service';
export declare class ReportsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findTransactionsWithinDateRange(startDate: Date, endDate: Date): Promise<{
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
    countUserLinkedAccounts(userId: string): Promise<number>;
    countUserTransactions(userId: string): Promise<number>;
}
