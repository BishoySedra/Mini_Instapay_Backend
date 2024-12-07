import { Module, OnModuleInit } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from 'prisma/prisma.service';
import { InAppNotification } from './app.notification';
import { NotificationService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';
import { NotificationFactory } from './notifications.factory';

@Module({
  providers: [
    NotificationService,
    NotificationsRepository,
    PrismaService,
    InAppNotification,
    NotificationFactory,
  ],
  controllers: [NotificationsController],
  exports: [NotificationService, InAppNotification],
})
export class NotificationsModule implements OnModuleInit {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly inAppNotification: InAppNotification,
  ) {}

  onModuleInit() {
    this.notificationService.subscribe(this.inAppNotification);
  }

  onModuleDestroy() {
    this.notificationService.unsubscribe(this.inAppNotification);
  }
}
