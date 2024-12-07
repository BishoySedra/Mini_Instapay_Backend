import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationType } from './notifications.type';

@Injectable()
export class NotificationFactory {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(type: NotificationType, data: any): Promise<void> {
    switch (type) {
      case NotificationType.IN_APP:
        await this.createInAppNotification(data);
        break;

      case NotificationType.EMAIL:
        await this.createEmailNotification(data);
        break;

      case NotificationType.SMS:
        await this.createSmsNotification(data);
        break;

      default:
        throw new Error('Unsupported notification type');
    }
  }

  private async createInAppNotification(data: any): Promise<void> {
    await this.prisma.notification.create({
      data: {
        userId: data.userId,
        message: data.message,
      },
    });
  }

  private async createEmailNotification(data: any): Promise<void> {
    // Logic for sending email notifications
    console.log(`Email sent to ${data.email}: ${data.message}`);
  }

  private async createSmsNotification(data: any): Promise<void> {
    // Logic for sending SMS notifications
    console.log(`SMS sent to ${data.phone}: ${data.message}`);
  }
}
