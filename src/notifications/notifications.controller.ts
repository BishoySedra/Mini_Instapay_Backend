import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { NotificationService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  // Get all notifications for a user
  @Get(':userId')
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('read') read?: boolean,
  ) {
    return this.notificationService.getNotifications(userId, read);
  }

  // Mark a notification as read
  @Patch(':notificationId/read')
  async markNotificationAsRead(
    @Param('notificationId') notificationId: string,
  ) {
    return this.notificationService.markAsRead(notificationId);
  }
}
