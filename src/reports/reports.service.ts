import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { ReportFactory } from './reports.factory';

@Injectable()
export class ReportsService {
  constructor(
    private reportsRepository: ReportsRepository,
    private reportFactory: ReportFactory, // Inject Factory
  ) {}

  async getTransactionSummary(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const transactions =
      await this.reportsRepository.findTransactionsWithinDateRange(start, end);

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    return this.reportFactory.createTransactionSummaryReport(
      transactions,
      totalAmount,
    );
  }

  async getAccountUsage(user) {
    const id = user.id;
    const linkedAccounts =
      await this.reportsRepository.countUserLinkedAccounts(id);
    const transactionsCount =
      await this.reportsRepository.countUserTransactions(id);

    return this.reportFactory.createAccountUsageReport(
      linkedAccounts,
      transactionsCount,
    );
  }
}
