// src/users/user.factory.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory {
  createBankAccountResponse(account: any) {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      bankName: account.bankName,
      balance: account.balance,
    };
  }

  createUserProfileResponse(user: any) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  createBankAccountsResponse(accounts: any[]) {
    return accounts.map((account) => this.createBankAccountResponse(account));
  }
}
