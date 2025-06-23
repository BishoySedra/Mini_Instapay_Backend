import { Observer } from './observer';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationFactory } from './notifications.factory';
export declare class InAppNotification implements Observer {
    private prisma;
    private notificationFactory;
    constructor(prisma: PrismaService, notificationFactory: NotificationFactory);
    update(event: string, data: any): Promise<void>;
}
