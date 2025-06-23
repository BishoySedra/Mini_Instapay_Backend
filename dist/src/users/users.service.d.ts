import { UsersRepository } from './users.repository';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';
import { UserFactory } from './users.factory';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersRepository;
    private usersFactory;
    private jwtService;
    constructor(usersRepository: UsersRepository, usersFactory: UserFactory, jwtService: JwtService);
    linkBankAccount(bankAccountData: LinkBankAccountDTO, user: any): Promise<{
        id: any;
        accountNumber: any;
        bankName: any;
        balance: any;
    }>;
    unlinkBankAccount(bankAccountNumber: string, user: any): Promise<void>;
    showBankAccounts(user: any): Promise<{
        id: any;
        accountNumber: any;
        bankName: any;
        balance: any;
    }[]>;
    updateProfile(updateData: UpdateUserProfileDto, user: any): Promise<{
        id: any;
        email: any;
        name: any;
        createdAt: any;
    }>;
    getProfile(user: any): Promise<{
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
}
