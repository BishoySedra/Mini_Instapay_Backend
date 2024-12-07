import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async getUsers(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const users = await this.adminRepository.findPaginatedUsers(skip, pageSize);
    const totalUsers = await this.adminRepository.countUsers();
    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      users,
      totalUsers,
      totalPages,
      currentPage: page,
      pageSize,
    };
  }

  async suspendUser(userId: string) {
    return this.adminRepository.updateUserStatus(userId, false);
  }

  async monitorTransactions(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    return this.adminRepository.findPaginatedTransactions(skip, pageSize);
  }

  async getPendingTransactions() {
    return this.adminRepository.findPendingTransactions();
  }

  async suspendTransaction(transactionId: string) {
    return this.adminRepository.updateTransactionStatus(
      transactionId,
      'FAILED',
    );
  }

  async generateReport() {
    const transactions = await this.adminRepository.findAllTransactions();
    return {
      totalTransactions: transactions.length,
      totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
    };
  }
}
