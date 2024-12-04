import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Observer } from '../observer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable({ scope: Scope.DEFAULT })
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    // console.log('Subscribing observer:', observer.constructor.name); // Log observer
    this.observers.push(observer);
    // console.log('Current observers:', this.observers); // Log observers array
  }

  unsubscribe(observer: Observer): void {
    // console.log('Unsubscribing observer:', observer.constructor.name); // Log observer
    this.observers = this.observers.filter((obs) => obs !== observer);
    // console.log('Remaining observers:', this.observers); // Log remaining observers
  }

  // Notify all subscribers
  notify(event: string, data: any): void {
    // console.log(`Notifying observers of event "${event}" with data:`, data);
    // console.log('observers: ', this.observers);
    for (const observer of this.observers) {
      try {
        observer.update(event, data);
      } catch (error) {
        console.error(
          'Error notifying observer:',
          observer.constructor.name,
          error,
        );
      }
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
