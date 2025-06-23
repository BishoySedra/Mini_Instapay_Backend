import { PrismaService } from 'prisma/prisma.service';
import { NotificationType } from './notifications.type';
export declare class NotificationFactory {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createNotification(type: NotificationType, data: any): Promise<void>;
    private createInAppNotification;
    private createEmailNotification;
    private createSmsNotification;
}
