import { Module, OnModuleInit } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { InAppNotification } from './app.notification';

@Module({
  providers: [NotificationService, InAppNotification],
  controllers: [NotificationsController],
  exports: [NotificationService],
})
export class NotificationsModule implements OnModuleInit {
  constructor(
    private notificationService: NotificationService,
    private inAppNotification: InAppNotification,
  ) {}

  onModuleInit() {
    this.notificationService.subscribe(this.inAppNotification);
  }
}
