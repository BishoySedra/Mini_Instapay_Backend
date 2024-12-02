import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async showUserTransactions(user) {
    return await this.prisma.transaction.findMany({
      where: {
        OR: [{ senderId: user.id }, { receiverId: user.id }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async makeTransaction(
    user,
    senderAccountNumber,
    receiverAccountNumber,
    amount,
    transferType: TransactionType,
  ) {
    if (amount <= 0) {
      throw new BadRequestException(
        'Transfer amount must be greater than zero',
      );
    }
    const senderAccount = await this.prisma.bankAccount.findFirst({
      where: {
        userId: user.id,
        accountNumber: senderAccountNumber,
      },
    });
    if (!senderAccount)
      throw new BadRequestException('sender account not found');
    if (senderAccount.balance < amount) {
      throw new BadRequestException('Insufficient funds in the sender account');
    }
    const receiverAccount = await this.prisma.bankAccount.findFirst({
      where: {
        accountNumber: receiverAccountNumber,
      },
    });
    if (!receiverAccount)
      throw new BadRequestException('wrong receiver account number');

    let transaction;
    if (transferType === TransactionType.INSTANT) {
      return await this.prisma.$transaction(async (prisma) => {
        // Deduct amount from sender
        await prisma.bankAccount.update({
          where: { accountNumber: senderAccountNumber },
          data: {
            balance: { decrement: amount },
          },
        });

        // Add amount to receiver
        await prisma.bankAccount.update({
          where: { accountNumber: receiverAccountNumber },
          data: {
            balance: { increment: amount },
          },
        });

        transaction = await prisma.transaction.create({
          data: {
            sender: { connect: { id: senderAccount.userId } },
            receiver: { connect: { id: receiverAccount.userId } },
            amount,
            type: 'INSTANT',
            status: 'SUCCESS',
          },
        });
      });
    }
    if (transferType === TransactionType.SCHEDULED) {
      transaction = await this.prisma.transaction.create({
        data: {
          sender: { connect: { id: senderAccount.userId } },
          receiver: { connect: { id: receiverAccount.userId } },
          amount,
          type: 'SCHEDULED',
          status: 'PENDING',
        },
      });
    }
    if (transferType === TransactionType.REFUND) {
      transaction = await this.prisma.transaction.create({
        data: {
          sender: { connect: { id: senderAccount.userId } },
          receiver: { connect: { id: receiverAccount.userId } },
          amount,
          type: 'REFUND',
          status: 'PENDING',
        },
      });
    }
    return transaction;
  }
  async showRefundRequests(user) {
    const refunds = await this.prisma.transaction.findMany({
      where: {
        type: 'REFUND',
        status: 'PENDING',
        receiverId: user.id,
      },
    });
    return refunds;
  }
  async acceptRefund(id) {
    {
      return await this.prisma.$transaction(async (prisma) => {
        const transaction = await this.prisma.transaction.update({
          where: { id },
          data: {
            status: 'SUCCESS',
          },
        });
        await prisma.bankAccount.update({
          where: { accountNumber: transaction.receiverId },
          data: {
            balance: { decrement: amount },
          },
        });

        // Add amount to receiver
        await prisma.bankAccount.update({
          where: { accountNumber: receiverAccountNumber },
          data: {
            balance: { increment: amount },
          },
        });
      });
    }

    return refund;
  }
}
