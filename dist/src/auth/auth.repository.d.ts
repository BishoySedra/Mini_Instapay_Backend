import { PrismaService } from 'prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}
