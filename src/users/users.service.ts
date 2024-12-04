import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async linkBankAccount(bankAccountData: LinkBankAccountDTO, user) {
    const { accountNumber, bankName, balance } = bankAccountData;
    const account = await this.prisma.bankAccount.create({
      data: { accountNumber, bankName, balance, userId: user.id },
    });
    if (!account) throw new HttpException('error in account creation', 404);

    return account;
  }
  async unlinkBankAccount(bankAccountNumber: string, user) {
    try {
      await this.prisma.bankAccount.delete({
        where: { accountNumber: bankAccountNumber, userId: user.id },
      });
    } catch (err) {
      throw new BadRequestException('failed to unlink this bank account');
    }
    return;
  }
  async showBankAccounts(user) {
    const accounts = await this.prisma.bankAccount.findMany({
      where: {
        userId: user.id,
      },
    });
    if (!accounts)
      throw new HttpException('user has no accounts', HttpStatus.BAD_REQUEST);
    return accounts;
  }

  async updateProfile(updateData, user) {
    const email = user.email;

    const updateFields = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateData).filter(([_, value]) => value !== undefined),
    ) as Partial<{ phone: string; email: string; address: string }>;

    const updatedUser = await this.prisma.user.update({
      where: {
        email,
      },
      data: updateFields,
    });
    return updatedUser;
  }
}
