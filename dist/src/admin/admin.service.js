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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("./admin.repository");
let AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async getUsers(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const users = await this.adminRepository.findPaginatedUsers(skip, pageSize);
        const totalUsers = await this.adminRepository.countUsers();
        const totalPages = Math.ceil(totalUsers / pageSize);
        return {
            users,
            totalUsers,
            totalPages,
            currentPage: page,
            pageSize,
        };
    }
    async getAllBankAccounts() {
        return this.adminRepository.findAllBankAccounts();
    }
    async suspendUser(userId) {
        return this.adminRepository.updateUserStatus(userId, false);
    }
    async monitorTransactions(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        return this.adminRepository.findPaginatedTransactions(skip, pageSize);
    }
    async getPendingTransactions() {
        return this.adminRepository.findPendingTransactions();
    }
    async suspendTransaction(transactionId) {
        return this.adminRepository.updateTransactionStatus(transactionId, 'FAILED');
    }
    async getUserDetails(userId) {
        const bankAccounts = await this.adminRepository.findUserBankAccounts(userId);
        const transactions = await this.adminRepository.findUserTransactions(userId);
        return {
            bankAccounts,
            transactions,
        };
    }
    async generateReport() {
        const transactions = await this.adminRepository.findAllTransactions();
        return {
            totalTransactions: transactions.length,
            totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], AdminService);
//# sourceMappingURL=admin.service.js.map