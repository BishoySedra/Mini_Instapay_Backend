import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getPaginatedUsers(page: number, pageSize: number): Promise<{
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
    showPendingTransactions(): Promise<{
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
    suspendTransaction(transactionId: string): Promise<{
        message: string;
    }>;
    monitorTransactions(page: number, pageSize: number): Promise<{
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
    viewUser(id: string): Promise<{
        message: string;
        data: {
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
        };
    }>;
    generateReport(): Promise<{
        message: string;
        data: {
            totalTransactions: number;
            totalAmount: number;
        };
    }>;
    getAllAccounts(): Promise<{
        message: string;
        accounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accountNumber: string;
            bankName: string;
            balance: number;
            userId: string;
        }[];
    }>;
}
