import { ReportsRepository } from './reports.repository';
import { ReportFactory } from './reports.factory';
export declare class ReportsService {
    private reportsRepository;
    private reportFactory;
    constructor(reportsRepository: ReportsRepository, reportFactory: ReportFactory);
    getTransactionSummary(startDate: string, endDate: string): Promise<{
        type: string;
        totalTransactions: any;
        totalAmount: any;
        transactions: any;
    }>;
    getAccountUsage(user: any): Promise<{
        type: string;
        linkedAccounts: any;
        transactionsCount: any;
    }>;
}
