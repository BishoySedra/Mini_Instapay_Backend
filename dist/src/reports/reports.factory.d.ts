export declare class ReportFactory {
    createTransactionSummaryReport(transactions: any, totalAmount: any): {
        type: string;
        totalTransactions: any;
        totalAmount: any;
        transactions: any;
    };
    createAccountUsageReport(linkedAccounts: any, transactionsCount: any): {
        type: string;
        linkedAccounts: any;
        transactionsCount: any;
    };
}
