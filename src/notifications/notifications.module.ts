import { Module, OnModuleInit } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { InAppNotification } from './app.notification';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [NotificationService, InAppNotification, PrismaService],
  controllers: [NotificationsController],
  exports: [NotificationService, InAppNotification],
})
export class NotificationsModule implements OnModuleInit {
  constructor(
    private notificationService: NotificationService,
    private inAppNotification: InAppNotification,
  ) {}

  onModuleInit() {
    // console.log(
    //   'NotificationService instance in NotificationsModule:',
    //   this.notificationService,
    // );
    // console.log(
    //   'InAppNotification instance in NotificationsModule:',
    //   this.inAppNotification,
    // );
    this.notificationService.subscribe(this.inAppNotification);
    // console.log(
    //   'Observers after subscription:',
    //   this.notificationService['observers'],
    // );
  }
  onModuleDestroy() {
    // console.log('Destroying NotificationsModule...');
    this.notificationService.unsubscribe(this.inAppNotification);
  }
}
