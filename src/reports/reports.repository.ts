import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReportsRepository {
  constructor(private prisma: PrismaService) {}

  async findTransactionsWithinDateRange(startDate: Date, endDate: Date) {
    return await this.prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  async countUserLinkedAccounts(userId: string) {
    return await this.prisma.bankAccount.count({
      where: { userId },
    });
  }

  async countUserTransactions(userId: string) {
    return await this.prisma.transaction.count({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });
  }
}
