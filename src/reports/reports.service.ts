import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getTransactionSummary(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalTransactions: transactions.length,
      totalAmount,
      transactions,
    };
  }

  async getAccountUsage(userId: string) {
    const linkedAccounts = await this.prisma.bankAccount.count({
      where: { userId },
    });

    const transactionsCount = await this.prisma.transaction.count({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    return {
      linkedAccounts,
      transactionsCount,
    };
  }
}
