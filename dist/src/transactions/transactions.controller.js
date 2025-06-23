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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const transaction_dto_1 = require("./dto/transaction.dto");
const swagger_1 = require("@nestjs/swagger");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async showAllTransactions(req) {
        const transactions = await this.transactionsService.showUserTransactions(req.user);
        return { message: 'showing all transactions', data: transactions };
    }
    async makeTransaction(req, body) {
        try {
            const transaction = await this.transactionsService.makeTransaction(req.user, body.senderAccountNumber, body.receiverAccountNumber, body.amount, body.transactionType);
            return { message: 'Transaction successful', data: transaction };
        }
        catch (error) {
            console.error('Transaction failed:', error);
            throw error;
        }
    }
    async showRefundRequests(req) {
        const refunds = await this.transactionsService.showRefundRequests(req.user);
        return { message: 'showing refund requests', data: refunds };
    }
    async acceptRefund(id) {
        const refund = await this.transactionsService.acceptRefund(id);
        return { message: 'refund accepted', data: refund };
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Get)('show-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Show all transactions for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user transactions' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "showAllTransactions", null);
__decorate([
    (0, common_1.Post)('make-transaction'),
    (0, swagger_1.ApiOperation)({ summary: 'Make a new transaction' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Transaction created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid transaction data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transaction_dto_1.TransactionDTO]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "makeTransaction", null);
__decorate([
    (0, common_1.Get)('show-refunds'),
    (0, swagger_1.ApiOperation)({ summary: 'Show all refund requests for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of refund requests' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "showRefundRequests", null);
__decorate([
    (0, common_1.Post)('accept-refund/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a refund request' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the refund transaction to accept' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Refund accepted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid refund request' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "acceptRefund", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('transactions'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map