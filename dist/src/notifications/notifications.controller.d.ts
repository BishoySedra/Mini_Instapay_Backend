import { NotificationService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getUserNotifications(userId: string, read?: boolean): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        read: boolean;
    }[]>;
    markNotificationAsRead(notificationId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        read: boolean;
    }>;
}
