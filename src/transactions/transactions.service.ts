import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionStatus, TransactionType } from '@prisma/client';
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
    if (amount <= 0)
      throw new BadRequestException(
        'Transfer amount must be greater than zero',
      );

    const senderAccount = await this.prisma.bankAccount.findFirst({
      where: {
        accountNumber: senderAccountNumber,
      },
    });
    if (!senderAccount)
      throw new BadRequestException('sender account not found');
    if (senderAccount.balance < amount)
      throw new BadRequestException('Insufficient funds in the sender account');

    const sender = await this.prisma.user.findFirst({
      where: { id: user.id },
    });

    if (sender.dailyLimit - sender.dailyTransactionTotal <= amount)
      throw new BadRequestException('Daily limit exceeded');

    const receiverAccount = await this.prisma.bankAccount.findFirst({
      where: {
        accountNumber: receiverAccountNumber,
      },
    });

    if (!receiverAccount)
      throw new BadRequestException('wrong receiver account number');

    let transaction, type: TransactionType, status: TransactionStatus;

    return await this.prisma.$transaction(async (prisma) => {
      // subtract amount from sender
      await prisma.bankAccount.update({
        where: { accountNumber: senderAccountNumber },
        data: {
          balance: { decrement: amount },
        },
      });
      // update daily transaction limit
      await prisma.user.update({
        where: { id: user.id },
        data: { dailyTransactionTotal: { increment: amount } },
      });
      // Add amount to receiver
      await prisma.bankAccount.update({
        where: { accountNumber: receiverAccountNumber },
        data: {
          balance: { increment: amount },
        },
      });

      if (transferType === TransactionType.INSTANT) {
        type = 'INSTANT';
        status = 'SUCCESS';
      }
      if (transferType === TransactionType.SCHEDULED) {
        type = 'SCHEDULED';
        status = 'PENDING';
      }

      transaction = await prisma.transaction.create({
        data: {
          sender: { connect: { id: senderAccount.userId } },
          receiver: { connect: { id: receiverAccount.userId } },
          amount,
          type,
          status,
          senderBankAccount: { connect: { id: senderAccount.id } },
          receiverBankAccount: { connect: { id: receiverAccount.id } },
        },
      });
      return transaction;
    });
  }

  async requestRefund(
    user,
    senderAccountNumber,
    receiverAccountNumber,
    amount,
  ) {
    const transaction = await this.prisma.transaction.create({
      data: {
        sender: { connect: { id: user.id } },
        receiver: { connect: { id: user.id } },
        amount,
        type: 'REFUND',
        status: 'PENDING',
        senderBankAccount: { connect: { id: senderAccountNumber } },
        receiverBankAccount: { connect: { id: receiverAccountNumber } },
      },
    });
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
  async acceptRefund(transactionId) {
    {
      return await this.prisma.$transaction(async (prisma) => {
        const transaction = await this.prisma.transaction.update({
          where: { id: transactionId },
          data: {
            status: 'SUCCESS',
          },
        });

        await prisma.bankAccount.update({
          where: { id: transaction.receiverBankAccountId },
          data: {
            balance: { decrement: transaction.amount },
          },
        });

        await prisma.bankAccount.update({
          where: { id: transaction.senderBankAccountId },
          data: {
            balance: { increment: transaction.amount },
          },
        });
        return transaction;
      });
    }
  }
}
