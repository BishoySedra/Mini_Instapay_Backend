import { UsersService } from './users.service';
import { Request } from 'express';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    linkBankAccount(linkBankAccountDTO: LinkBankAccountDTO, req: Request): Promise<{
        message: string;
        account: {
            id: any;
            accountNumber: any;
            bankName: any;
            balance: any;
        };
    }>;
    unlinkBankAccount(bankAccountNumber: string, req: Request): Promise<{
        message: string;
    }>;
    showBankAccounts(req: Request): Promise<{
        message: string;
        accounts: {
            id: any;
            accountNumber: any;
            bankName: any;
            balance: any;
        }[];
    }>;
    updateProfile(req: Request, updateData: UpdateUserProfileDto): Promise<{
        message: string;
        updatedUser: {
            id: any;
            email: any;
            name: any;
            createdAt: any;
        };
    }>;
    getProfile(req: Request): Promise<{
        message: string;
        user: {
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
        };
    }>;
}
