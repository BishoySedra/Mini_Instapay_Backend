import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async getUsers(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const users = await this.prisma.user.findMany({
      skip: skip,
      take: pageSize,
    });

    const totalUsers = await this.prisma.user.count(); // Get the total number of users
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
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
  }

  async monitorTransactions(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    return this.prisma.transaction.findMany({
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });
  }

  async generateReport() {
    // Example: Generate a monthly transaction summary
    const transactions = await this.prisma.transaction.findMany();
    return {
      totalTransactions: transactions.length,
      totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
    };
  }
}
