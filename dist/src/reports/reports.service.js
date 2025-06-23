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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const reports_repository_1 = require("./reports.repository");
const reports_factory_1 = require("./reports.factory");
let ReportsService = class ReportsService {
    constructor(reportsRepository, reportFactory) {
        this.reportsRepository = reportsRepository;
        this.reportFactory = reportFactory;
    }
    async getTransactionSummary(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const transactions = await this.reportsRepository.findTransactionsWithinDateRange(start, end);
        const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
        return this.reportFactory.createTransactionSummaryReport(transactions, totalAmount);
    }
    async getAccountUsage(user) {
        const id = user.id;
        const linkedAccounts = await this.reportsRepository.countUserLinkedAccounts(id);
        const transactionsCount = await this.reportsRepository.countUserTransactions(id);
        return this.reportFactory.createAccountUsageReport(linkedAccounts, transactionsCount);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reports_repository_1.ReportsRepository,
        reports_factory_1.ReportFactory])
], ReportsService);
//# sourceMappingURL=reports.service.js.map