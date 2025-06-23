import { AdminRepository } from './admin.repository';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: AdminRepository);
    getUsers(page?: number, pageSize?: number): Promise<{
        users: {
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
        }[];
        totalUsers: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    }>;
    getAllBankAccounts(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }[]>;
    suspendUser(userId: string): Promise<{
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
    monitorTransactions(page?: number, pageSize?: number): Promise<({
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
    getPendingTransactions(): Promise<{
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
    suspendTransaction(transactionId: string): Promise<{
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
    getUserDetails(userId: string): Promise<{
        bankAccounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accountNumber: string;
            bankName: string;
            balance: number;
            userId: string;
        }[];
        transactions: ({
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
    generateReport(): Promise<{
        totalTransactions: number;
        totalAmount: number;
    }>;
}
