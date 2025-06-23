import { OnModuleInit } from '@nestjs/common';
import { InAppNotification } from './app.notification';
import { NotificationService } from './notifications.service';
export declare class NotificationsModule implements OnModuleInit {
    private readonly notificationService;
    private readonly inAppNotification;
    constructor(notificationService: NotificationService, inAppNotification: InAppNotification);
    onModuleInit(): void;
    onModuleDestroy(): void;
}
