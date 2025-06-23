import { PrismaService } from 'prisma/prisma.service';
import { Observer } from './observer';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    private observers;
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(event: string, data: any): void;
    getNotifications(userId: string, read?: boolean): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        read: boolean;
    }[]>;
    markAsRead(notificationId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        read: boolean;
    }>;
}
