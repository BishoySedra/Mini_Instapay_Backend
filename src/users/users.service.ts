import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // async createBankAccount() {
  //   this.prisma.bankAccount.create();
  // }
  async updateProfile(updateData, user) {
    const email = user.email;
    const updateUser = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        phone: updateData.phone,
        email: updateData.email,
      },
    });
    return updateUser;
  }
}
