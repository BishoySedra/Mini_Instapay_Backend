import { TransactionType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { TransactionsRepository } from './transactions.repository';
import { TransactionFactory } from './transactions.factory';
export declare class TransactionsService {
    private prisma;
    private notificationsService;
    private transactionsRepository;
    private transactionFactory;
    constructor(prisma: PrismaService, notificationsService: NotificationService, transactionsRepository: TransactionsRepository, transactionFactory: TransactionFactory);
    showUserTransactions(user: any): Promise<({
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
    makeTransaction(user: any, senderAccountNumber: string, receiverAccountNumber: string, amount: number, transferType: TransactionType): Promise<any>;
    requestRefund(user: any, senderAccountNumber: any, receiverAccountNumber: any, amount: any): Promise<any>;
    requestRefund2(user: any, transactionToRefundID: any): Promise<{
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
    showRefundRequests(user: any): Promise<{
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
    acceptRefund(transactionId: any): Promise<{
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
}
