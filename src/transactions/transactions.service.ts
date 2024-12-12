import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { TransactionsRepository } from './transactions.repository';
import { TransactionFactory } from './transactions.factory';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationService,
    private transactionsRepository: TransactionsRepository,
    private transactionFactory: TransactionFactory,
  ) {}

  async showUserTransactions(user) {
    return await this.transactionsRepository.findUserTransactions(user.id);
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

    const senderAccount =
      await this.transactionsRepository.findBankAccountByAccNumber(
        senderAccountNumber,
      );

    if (!senderAccount) {
      throw new BadRequestException('Sender account not found');
    }
    if (senderAccount.accountNumber != user.id)
      throw new UnauthorizedException(
        'the sender bank account is not your account',
      );
    if (senderAccount.balance < amount) {
      throw new BadRequestException('Insufficient funds in the sender account');
    }

    const sender = await this.transactionsRepository.findUserById(user.id);

    const remainingFunds = sender.dailyLimit - sender.dailyTransactionTotal;
    if (remainingFunds < amount) {
      throw new BadRequestException(
        `Daily limit exceeded, you only have ${remainingFunds} left.`,
      );
    }

    const receiverAccount =
      await this.transactionsRepository.findBankAccountByAccNumber(
        receiverAccountNumber,
      );

    if (!receiverAccount) {
      throw new BadRequestException('Receiver account not found');
    }

    const receiver = await this.transactionsRepository.findUserById(
      receiverAccount.userId,
    );

    try {
      const transaction = await this.prisma.$transaction(async (prisma) => {
        console.log('Updating sender and receiver accounts...');

        await this.transactionsRepository.decrementAccountBalance(
          prisma,
          senderAccountNumber,
          amount,
        );
        await this.transactionsRepository.updateUserDailyTransaction(
          prisma,
          sender.id,
          amount,
        );
        await this.transactionsRepository.incrementAccountBalance(
          prisma,
          receiverAccountNumber,
          amount,
        );

        const newTransaction =
          await this.transactionsRepository.createTransaction(
            this.transactionFactory.createTransaction(
              senderAccount.userId,
              receiverAccount.userId,
              senderAccount.id,
              receiverAccount.id,
              amount,
              transferType,
              transferType === TransactionType.INSTANT ? 'SUCCESS' : 'PENDING',
            ),
            prisma,
          );

        // console.log('Transaction created:', newTransaction);
        await this.transactionsRepository.makeTransactionNotification(
          this.notificationsService,
          sender,
          receiver,
          amount,
          'sent',
        );
        await this.transactionsRepository.makeTransactionNotification(
          this.notificationsService,
          sender,
          receiver,
          amount,
          'received',
        );

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
    const transaction = this.transactionsRepository.createTransaction({
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
    const refunds = await this.transactionsRepository.findRefundRequests(
      user.id,
    );
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
