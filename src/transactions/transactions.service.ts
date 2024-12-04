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
      include: {
        senderBankAccount: {
          select: {
            accountNumber: true, // This will show the sender's account number
          },
        },
        receiverBankAccount: {
          select: {
            accountNumber: true, // This will show the receiver's account number
          },
        },
        sender: {
          select: {
            name: true, // Sender's name (optional, you can add more fields if needed)
          },
        },
        receiver: {
          select: {
            name: true, // Receiver's name (optional, you can add more fields if needed)
          },
        },
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
    console.log('Starting transaction process...');

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

    const sender = await this.prisma.user.findFirst({ where: { id: user.id } });
    const remainingFunds = sender.dailyLimit - sender.dailyTransactionTotal;
    if (remainingFunds < amount) {
      throw new BadRequestException(
        `Daily limit exceeded, you only have ${remainingFunds} left.`,
      );
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

    try {
      const transaction = await this.prisma.$transaction(async (prisma) => {
        console.log('Updating sender and receiver accounts...');

        await prisma.bankAccount.update({
          where: { accountNumber: senderAccountNumber },
          data: { balance: { decrement: amount } },
        });

        await prisma.user.update({
          where: { id: sender.id },
          data: { dailyTransactionTotal: { increment: amount } },
        });

        await prisma.bankAccount.update({
          where: { accountNumber: receiverAccountNumber },
          data: { balance: { increment: amount } },
        });

        const newTransaction = await prisma.transaction.create({
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

        console.log('Transaction created:', newTransaction);

        await this.notificationsService.notify('transaction', {
          type: 'sent',
          sender: { id: sender.id, name: sender.name },
          receiver: { id: receiver.id, name: receiver.name },
          amount,
        });

        await this.notificationsService.notify('transaction', {
          type: 'received',
          sender: { id: sender.id, name: sender.name },
          receiver: { id: receiver.id, name: receiver.name },
          amount,
        });

        return newTransaction;
      });

      console.log('Transaction process completed successfully.');
      return transaction;
    } catch (error) {
      console.error('Transaction process failed:', error);
      throw new Error('Transaction failed. Please try again later.');
    }
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
  async requestRefund2(user, transactionToRefundID) {
    let transaction = await this.prisma.transaction.findFirst({
      where: {
        id: transactionToRefundID,
        senderId: user.id,
      },
    });
    if (!transaction)
      throw new BadRequestException(
        'refund not accepted as transaction not found',
      );
    transaction = await this.prisma.transaction.create({
      data: {
        sender: { connect: { id: user.id } },
        receiver: { connect: { id: transaction.receiverId } },
        amount: transaction.amount,
        type: 'REFUND',
        status: 'PENDING',
        senderBankAccount: { connect: { id: transaction.senderBankAccountId } },
        receiverBankAccount: {
          connect: { id: transaction.receiverBankAccountId },
        },
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
