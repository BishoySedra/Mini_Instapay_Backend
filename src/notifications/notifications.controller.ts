import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notifications.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) { }

  @ApiOperation({ summary: 'Get all notifications for a user' })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose notifications are being retrieved',
    type: String,
  })
  @ApiQuery({
    name: 'read',
    description: 'Filter notifications by read status (true or false)',
    required: false,
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'List of notifications retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  @Get(':userId')
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('read') read?: boolean,
  ) {
    return this.notificationService.getNotifications(userId, read);
  }

  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({
    name: 'notificationId',
    description: 'The ID of the notification to mark as read',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  @Patch(':notificationId/read')
  async markNotificationAsRead(
    @Param('notificationId') notificationId: string,
  ) {
    return this.notificationService.markAsRead(notificationId);
  }
}
