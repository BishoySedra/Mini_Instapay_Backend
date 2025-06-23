import { PrismaService } from 'prisma/prisma.service';
import { Notification } from '@prisma/client';
export declare class NotificationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findNotifications(userId: string, read?: boolean): Promise<Notification[]>;
    findNotificationById(notificationId: string): Promise<Notification | null>;
    updateNotification(notificationId: string, data: Partial<Notification>): Promise<Notification>;
}
