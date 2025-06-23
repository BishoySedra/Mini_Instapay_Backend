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
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminRepository = class AdminRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPaginatedUsers(skip, take) {
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
    async updateUserStatus(userId, isActive) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { isActive },
        });
    }
    async findUserTransactions(userId) {
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
    async findUserBankAccounts(userId) {
        return await this.prisma.bankAccount.findMany({
            where: {
                userId,
            },
        });
    }
    async findPaginatedTransactions(skip, take) {
        return this.prisma.transaction.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                senderBankAccount: { select: { accountNumber: true } },
                receiverBankAccount: { select: { accountNumber: true } },
                sender: { select: { name: true } },
                receiver: { select: { name: true } },
            },
        });
    }
    async findPendingTransactions() {
        return this.prisma.transaction.findMany({
            where: { status: 'PENDING' },
        });
    }
    async updateTransactionStatus(transactionId, status) {
        return this.prisma.transaction.update({
            where: { id: transactionId },
            data: { status },
        });
    }
    async findAllTransactions() {
        return this.prisma.transaction.findMany();
    }
};
exports.AdminRepository = AdminRepository;
exports.AdminRepository = AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminRepository);
//# sourceMappingURL=admin.repository.js.map