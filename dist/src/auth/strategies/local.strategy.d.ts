import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<{
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
}
export {};
