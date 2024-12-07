import { NotificationsModule } from 'src/notifications/notifications.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import { PrismaService } from 'prisma/prisma.service';
import { Module } from '@nestjs/common';
import { TransactionFactory } from './transactions.factory';

@Module({
  imports: [NotificationsModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    TransactionFactory,
    PrismaService,
  ],
})
export class TransactionsModule {}
