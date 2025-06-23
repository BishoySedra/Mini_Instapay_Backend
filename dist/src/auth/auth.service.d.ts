import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Prisma } from '@prisma/client';
export declare class AuthService {
    private jwtService;
    private authRepository;
    constructor(jwtService: JwtService, authRepository: AuthRepository);
    createUser(data: Prisma.UserCreateInput): Promise<{
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
    validateUser({ email, password }: AuthPayloadDto): Promise<{
        email: string;
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
    generateJwt(user: {
        id: string;
        email: string;
        name: string;
        isAdmin: boolean;
        phone: string;
        address: string;
    }): string;
}
