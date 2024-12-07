import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findNotifications(
    userId: string,
    read?: boolean,
  ): Promise<Notification[]> {
    const whereClause: any = { userId };

    if (read !== undefined) {
      whereClause.read = read;
    }

    return this.prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findNotificationById(
    notificationId: string,
  ): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
  }

  async updateNotification(
    notificationId: string,
    data: Partial<Notification>,
  ): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data,
    });
  }
}
