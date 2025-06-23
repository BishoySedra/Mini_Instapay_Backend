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
exports.TransactionsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TransactionsRepository = class TransactionsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserTransactions(userId) {
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
    createTransaction(arg1, arg2) {
        if (arg2) {
            return arg2.transaction.create({ data: arg1 });
        }
        else {
            return this.prisma.transaction.create({ data: arg1 });
        }
    }
    async updateTransactionStatus(transactionId, status) {
        return this.prisma.transaction.update({
            where: { id: transactionId },
            data: { status },
        });
    }
    async findRefundRequests(userId) {
        return this.prisma.transaction.findMany({
            where: {
                type: 'REFUND',
                status: 'PENDING',
                receiverId: userId,
            },
        });
    }
    async findTransactionById(transactionId) {
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
    async makeTransactionNotification(notificationsService, sender, receiver, amount, type) {
        await notificationsService.notify('transaction', {
            type,
            sender: { id: sender.id, name: sender.name },
            receiver: { id: receiver.id, name: receiver.name },
            amount,
        });
    }
};
exports.TransactionsRepository = TransactionsRepository;
exports.TransactionsRepository = TransactionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsRepository);
//# sourceMappingURL=transactions.repository.js.map