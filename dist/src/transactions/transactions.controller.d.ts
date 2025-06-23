import { TransactionsService } from './transactions.service';
import { Request } from 'express';
import { TransactionDTO } from './dto/transaction.dto';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    showAllTransactions(req: Request): Promise<{
        message: string;
        data: ({
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
        })[];
    }>;
    makeTransaction(req: Request, body: TransactionDTO): Promise<{
        message: string;
        data: any;
    }>;
    showRefundRequests(req: Request): Promise<{
        message: string;
        data: {
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
        }[];
    }>;
    acceptRefund(id: string): Promise<{
        message: string;
        data: {
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
        };
    }>;
}
