import { Injectable, Scope } from '@nestjs/common';
import { Observer } from './observer';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationFactory } from './notifications.factory';
import { NotificationType } from './notifications.type';

@Injectable({ scope: Scope.DEFAULT })
export class InAppNotification implements Observer {
  constructor(
    private prisma: PrismaService,
    private notificationFactory: NotificationFactory,
  ) {}

  async update(event: string, data: any): Promise<void> {
    try {
      // console.log(`Handling event "${event}" with data:`, data);
      if (event === 'transaction') {
        const { type, sender, receiver, amount } = data;

        if (type === 'sent') {
          await this.notificationFactory.createNotification(
            NotificationType.IN_APP,
            {
              userId: sender.id,
              message: `You have successfully sent $${amount} to ${receiver.name}.`,
            },
          );
          // console.log(`Notification created for sender: ${sender.id}`);
        } else if (type === 'received') {
          await this.notificationFactory.createNotification(
            NotificationType.IN_APP,
            {
              userId: receiver.id,
              message: `You have received $${amount} from ${sender.name}.`,
            },
          );
          // console.log(`Notification created for receiver: ${receiver.id}`);
        }
      }
    } catch (error) {
      // console.error('Error handling notification event:', error);
    }
  }
}
