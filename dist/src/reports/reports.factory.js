"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportFactory = void 0;
const common_1 = require("@nestjs/common");
let ReportFactory = class ReportFactory {
    createTransactionSummaryReport(transactions, totalAmount) {
        return {
            type: 'Transaction Summary',
            totalTransactions: transactions.length,
            totalAmount,
            transactions,
        };
    }
    createAccountUsageReport(linkedAccounts, transactionsCount) {
        return {
            type: 'Account Usage',
            linkedAccounts,
            transactionsCount,
        };
    }
};
exports.ReportFactory = ReportFactory;
exports.ReportFactory = ReportFactory = __decorate([
    (0, common_1.Injectable)()
], ReportFactory);
//# sourceMappingURL=reports.factory.js.map