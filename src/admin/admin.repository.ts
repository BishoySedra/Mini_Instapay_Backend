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
  async findAllBankAccounts() {
    return this.prisma.bankAccount.findMany();
  }
  async updateUserStatus(userId: string, isActive: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });
  }
  async findUserTransactions(userId: string) {
    return await this.prisma.transaction.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        senderBankAccount: { select: { accountNumber: true } },
        receiverBankAccount: { select: { accountNumber: true } },
        sender: { select: { name: true } },
        receiver: { select: { name: true } },
      },
    });
  }
  async findUserBankAccounts(userId: string) {
    return await this.prisma.bankAccount.findMany({
      where: {
        userId,
      },
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
