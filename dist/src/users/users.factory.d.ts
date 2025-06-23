export declare class UserFactory {
    createBankAccountResponse(account: any): {
        id: any;
        accountNumber: any;
        bankName: any;
        balance: any;
    };
    createUserProfileResponse(user: any): {
        id: any;
        email: any;
        name: any;
        createdAt: any;
    };
    createBankAccountsResponse(accounts: any[]): {
        id: any;
        accountNumber: any;
        bankName: any;
        balance: any;
    }[];
}
