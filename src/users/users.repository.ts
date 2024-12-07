// users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  // Find user by email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Update user data
  async updateProfile(email: string, updateData: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { email },
      data: updateData,
    });
  }
  async createBankAccount(data: any) {
    return this.prisma.bankAccount.create({ data });
  }

  // Find bank account by account number
  async findByAccountNumber(accountNumber: string) {
    return this.prisma.bankAccount.findFirst({
      where: { accountNumber },
    });
  }

  // Delete a bank account by account number
  async deleteByAccountNumber(accountNumber: string) {
    return this.prisma.bankAccount.delete({
      where: { accountNumber },
    });
  }

  // Find all bank accounts for a user
  async findAllByUserId(userId: string) {
    return this.prisma.bankAccount.findMany({
      where: { userId },
    });
  }
}
