"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const transactions_repository_1 = require("./transactions.repository");
const transactions_factory_1 = require("./transactions.factory");
let TransactionsService = class TransactionsService {
    constructor(prisma, notificationsService, transactionsRepository, transactionFactory) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.transactionsRepository = transactionsRepository;
        this.transactionFactory = transactionFactory;
    }
    async showUserTransactions(user) {
        return await this.transactionsRepository.findUserTransactions(user.id);
    }
    async makeTransaction(user, senderAccountNumber, receiverAccountNumber, amount, transferType) {
        console.log('Starting transaction process...');
        if (amount <= 0) {
            throw new common_1.BadRequestException('Transfer amount must be greater than zero');
        }
        const senderAccount = await this.transactionsRepository.findBankAccountByAccNumber(senderAccountNumber);
        if (!senderAccount) {
            throw new common_1.BadRequestException('Sender account not found');
        }
        if (senderAccount.accountNumber != user.id)
            throw new common_1.UnauthorizedException('the sender bank account is not your account');
        if (senderAccount.balance < amount) {
            throw new common_1.BadRequestException('Insufficient funds in the sender account');
        }
        const sender = await this.transactionsRepository.findUserById(user.id);
        const remainingFunds = sender.dailyLimit - sender.dailyTransactionTotal;
        if (remainingFunds < amount) {
            throw new common_1.BadRequestException(`Daily limit exceeded, you only have ${remainingFunds} left.`);
        }
        const receiverAccount = await this.transactionsRepository.findBankAccountByAccNumber(receiverAccountNumber);
        if (!receiverAccount) {
            throw new common_1.BadRequestException('Receiver account not found');
        }
        const receiver = await this.transactionsRepository.findUserById(receiverAccount.userId);
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                console.log('Updating sender and receiver accounts...');
                await this.transactionsRepository.decrementAccountBalance(prisma, senderAccountNumber, amount);
                await this.transactionsRepository.updateUserDailyTransaction(prisma, sender.id, amount);
                await this.transactionsRepository.incrementAccountBalance(prisma, receiverAccountNumber, amount);
                const newTransaction = await this.transactionsRepository.createTransaction(this.transactionFactory.createTransaction(senderAccount.userId, receiverAccount.userId, senderAccount.id, receiverAccount.id, amount, transferType, transferType === client_1.TransactionType.INSTANT ? 'SUCCESS' : 'PENDING'), prisma);
                await this.transactionsRepository.makeTransactionNotification(this.notificationsService, sender, receiver, amount, 'sent');
                await this.transactionsRepository.makeTransactionNotification(this.notificationsService, sender, receiver, amount, 'received');
                return newTransaction;
            });
            console.log('Transaction process completed successfully.');
            return transaction;
        }
        catch (error) {
            console.error('Transaction process failed:', error);
            throw new Error('Transaction failed. Please try again later.');
        }
    }
    async requestRefund(user, senderAccountNumber, receiverAccountNumber, amount) {
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
            throw new common_1.BadRequestException('refund not accepted as transaction not found');
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
        const refunds = await this.transactionsRepository.findRefundRequests(user.id);
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
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationService,
        transactions_repository_1.TransactionsRepository,
        transactions_factory_1.TransactionFactory])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map