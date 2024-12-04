import { Injectable } from '@nestjs/common';
import { Observer } from '../observer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InAppNotification implements Observer {
  constructor(private prisma: PrismaService) {}

  async update(event: string, data: any): Promise<void> {
    if (event === 'transaction') {
      const { type, sender, receiver, amount } = data;

      if (type === 'sent') {
        // Create a notification for the sender
        await this.prisma.notification.create({
          data: {
            userId: sender.id,
            message: `You have successfully sent $${amount} to ${receiver.name}.`,
          },
        });
      } else if (type === 'received') {
        // Create a notification for the receiver
        await this.prisma.notification.create({
          data: {
            userId: receiver.id,
            message: `You have received $${amount} from ${sender.name}.`,
          },
        });
      }
    }
  }
}
