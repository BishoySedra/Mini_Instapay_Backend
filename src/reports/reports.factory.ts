// src/reports/report.factory.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportFactory {
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
}
