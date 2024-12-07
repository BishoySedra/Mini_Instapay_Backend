import { Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}

  async findPaginatedUsers(skip: number, take: number) {
    return this.prisma.user.findMany({
      skip,
      take,
    });
  }

  async countUsers() {
    return this.prisma.user.count();
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });
  }

  async findPaginatedTransactions(skip: number, take: number) {
    return this.prisma.transaction.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPendingTransactions() {
    return this.prisma.transaction.findMany({
      where: { status: 'PENDING' },
    });
  }

  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus,
  ) {
    return this.prisma.transaction.update({
      where: { id: transactionId },
      data: { status },
    });
  }

  async findAllTransactions() {
    return this.prisma.transaction.findMany();
  }
}
