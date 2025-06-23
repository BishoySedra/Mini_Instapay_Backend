import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
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
    findByEmail(email: string): Promise<{
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
    updateProfile(email: string, updateData: Prisma.UserUpdateInput): Promise<{
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
    createBankAccount(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }>;
    findByAccountNumber(accountNumber: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }>;
    deleteByAccountNumber(accountNumber: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }>;
    findAllByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        bankName: string;
        balance: number;
        userId: string;
    }[]>;
}
