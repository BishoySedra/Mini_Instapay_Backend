import { Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Find all transactions for a user
  async findUserTransactions(userId: string) {
    return this.prisma.transaction.findMany({
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

  // Create a new transaction
  createTransaction(data: any, prisma): Promise<any>;
  createTransaction(data: any): Promise<any>;

  // Implementation
  createTransaction(arg1: any, arg2?: any): Promise<any> {
    if (arg2) {
      // Called with prisma and data
      return arg2.transaction.create({ data: arg1 });
    } else {
      // Called with only data
      return this.prisma.transaction.create({ data: arg1 });
    }
  }
  // async createTransaction(prisma, data: any) {
  //   return await prisma.transaction.create({
  //     data,
  //   });
  // async createTransaction(data) {
  //   return await prisma.transaction.create({
  //     data,
  //   });
  // }
  // const newTransaction = await prisma.transaction.create({
  //   data: {
  //     sender: { connect: { id: senderAccount.userId } },
  //     receiver: { connect: { id: receiverAccount.userId } },
  //     amount,
  //     type: transferType,
  //     status:
  //       transferType === TransactionType.INSTANT ? 'SUCCESS' : 'PENDING',
  //     senderBankAccount: { connect: { id: senderAccount.id } },
  //     receiverBankAccount: { connect: { id: receiverAccount.id } },
  //   },
  // });

  // Update transaction status
  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus,
  ) {
    return this.prisma.transaction.update({
      where: { id: transactionId },
      data: { status },
    });
  }

  // Find refund requests that are pending
  async findRefundRequests(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        type: 'REFUND',
        status: 'PENDING',
        receiverId: userId,
      },
    });
  }
  // Find a transaction by ID
  async findTransactionById(transactionId: string) {
    return this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
  }
  async findBankAccountByAccNumber(senderAccountNumber) {
    return await this.prisma.bankAccount.findFirst({
      where: { accountNumber: senderAccountNumber },
    });
  }
  async findUserById(id) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async incrementAccountBalance(prisma, accountNumber, amount) {
    await prisma.bankAccount.update({
      where: { accountNumber },
      data: { balance: { increment: amount } },
    });
  }
  async decrementAccountBalance(prisma, accountNumber, amount) {
    await prisma.bankAccount.update({
      where: { accountNumber },
      data: { balance: { decrement: amount } },
    });
  }
  async updateUserDailyTransaction(prisma, id, amount) {
    await prisma.user.update({
      where: { id },
      data: { dailyTransactionTotal: { increment: amount } },
    });
  }
  async makeTransactionNotification(
    notificationsService,
    sender,
    receiver,
    amount,
    type,
  ) {
    await notificationsService.notify('transaction', {
      type,
      sender: { id: sender.id, name: sender.name },
      receiver: { id: receiver.id, name: receiver.name },
      amount,
    });
  }
}
