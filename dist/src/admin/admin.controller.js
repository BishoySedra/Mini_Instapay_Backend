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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_guard_1 = require("../auth/guards/admin.guard");
const admin_service_1 = require("./admin.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getPaginatedUsers(page, pageSize) {
        return this.adminService.getUsers(Number(page) || 1, Number(pageSize) || 10);
    }
    async suspendUser(userId) {
        return await this.adminService.suspendUser(userId);
    }
    async showPendingTransactions() {
        const transactions = await this.adminService.getPendingTransactions();
        return { message: 'showing pending transactions', data: transactions };
    }
    async suspendTransaction(transactionId) {
        await this.adminService.suspendTransaction(transactionId);
        return { message: 'transaction suspended' };
    }
    async monitorTransactions(page, pageSize) {
        const transactions = await this.adminService.monitorTransactions(Number(page) || 1, Number(pageSize) || 10);
        return { message: 'showing transactions', data: transactions };
    }
    async viewUser(id) {
        const data = await this.adminService.getUserDetails(id);
        return { message: 'showing user accounts and transactions', data };
    }
    async generateReport() {
        const report = await this.adminService.generateReport();
        return { message: 'report generated', data: report };
    }
    async getAllAccounts() {
        const accounts = await this.adminService.getAllBankAccounts();
        return { message: 'bank accounts returned successfuly', accounts };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated list of users' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Page number', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, description: 'Number of users per page', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated list of users returned successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPaginatedUsers", null);
__decorate([
    (0, common_1.Patch)('suspendUser/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend a user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User suspended successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Get)('pending-transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pending transactions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending transactions retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "showPendingTransactions", null);
__decorate([
    (0, common_1.Patch)('suspendTransaction/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend a transaction by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Transaction ID', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction suspended successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspendTransaction", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Monitor paginated transactions' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Page number', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, description: 'Number of transactions per page', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated transactions retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "monitorTransactions", null);
__decorate([
    (0, common_1.Get)('userDetails/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user details including bank accounts and transactions' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User details retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "viewUser", null);
__decorate([
    (0, common_1.Get)('report'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a report of all transactions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report generated successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "generateReport", null);
__decorate([
    (0, common_1.Get)('allBankAccounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bank accounts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bank accounts retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllAccounts", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map