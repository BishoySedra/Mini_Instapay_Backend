import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notifications/notifications.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationService,
  ) {}

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
    senderAccountNumber: string,
    receiverAccountNumber: string,
    amount: number,
    transferType: TransactionType,
  ) {
    if (amount <= 0) {
      throw new BadRequestException(
        'Transfer amount must be greater than zero',
      );
    }

    const senderAccount = await this.prisma.bankAccount.findFirst({
      where: { accountNumber: senderAccountNumber },
    });

    if (!senderAccount) {
      throw new BadRequestException('Sender account not found');
    }

    if (senderAccount.balance < amount) {
      throw new BadRequestException('Insufficient funds in the sender account');
    }

    const sender = await this.prisma.user.findFirst({
      where: { id: user.id },
    });

    if (sender.dailyLimit - sender.dailyTransactionTotal < amount) {
      throw new BadRequestException('Daily limit exceeded');
    }

    const receiverAccount = await this.prisma.bankAccount.findFirst({
      where: { accountNumber: receiverAccountNumber },
    });

    if (!receiverAccount) {
      throw new BadRequestException('Receiver account not found');
    }
    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverAccount.userId },
    });

    return this.prisma.$transaction(async (prisma) => {
      // Update sender account balance and daily transaction total
      await prisma.bankAccount.update({
        where: { accountNumber: senderAccountNumber },
        data: { balance: { decrement: amount } },
      });

      await prisma.user.update({
        where: { id: sender.id },
        data: { dailyTransactionTotal: { increment: amount } },
      });

      // Update receiver account balance
      await prisma.bankAccount.update({
        where: { accountNumber: receiverAccountNumber },
        data: { balance: { increment: amount } },
      });

      const transaction = await prisma.transaction.create({
        data: {
          sender: { connect: { id: senderAccount.userId } },
          receiver: { connect: { id: receiverAccount.userId } },
          amount,
          type: transferType,
          status:
            transferType === TransactionType.INSTANT ? 'SUCCESS' : 'PENDING',
          senderBankAccount: { connect: { id: senderAccount.id } },
          receiverBankAccount: { connect: { id: receiverAccount.id } },
        },
      });

      // Notify sender
      this.notificationsService.notify('transaction', {
        type: 'sent',
        sender: { id: sender.id, name: sender.name },
        receiver: {
          id: receiver.id,
          name: receiver.name,
        },
        amount,
      });

      // Notify receiver
      this.notificationsService.notify('transaction', {
        type: 'received',
        sender: { id: sender.id, name: sender.name },
        receiver: {
          id: receiver.id,
          name: receiver.name,
        },
        amount,
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
