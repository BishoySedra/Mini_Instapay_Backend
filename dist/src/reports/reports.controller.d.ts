import { ReportsService } from './reports.service';
import { Request } from 'express';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    transactionSummary(startDate: string, endDate: string): Promise<{
        type: string;
        totalTransactions: any;
        totalAmount: any;
        transactions: any;
    }>;
    accountUsage(req: Request): Promise<{
        type: string;
        linkedAccounts: any;
        transactionsCount: any;
    }>;
}
