import { Injectable, NotFoundException } from '@nestjs/common';
import { Observer } from '../observer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notify all subscribers
  notify(event: string, data: any): void {
    for (const observer of this.observers) {
      observer.update(event, data);
    }
  }

  async getNotifications(userId: string, read?: boolean) {
    const whereClause: any = { userId };

    // If 'read' query parameter is specified, filter accordingly
    if (read !== undefined) {
      whereClause.read = read;
    }

    return await this.prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }, // Newest notifications first
    });
  }

  // Mark a notification as read
  async markAsRead(notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return await this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }
}
