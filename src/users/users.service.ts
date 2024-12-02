import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
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
    console.log(account);
    if (!account) throw new HttpException('error in account creation', 404);

    return account;
  }
  async unlinkBankAccount(bankAccountId: string, user) {
    if (bankAccountId != user.id)
      throw new UnauthorizedException(
        'not allowed to unlink other users accounts',
      );
    await this.prisma.bankAccount.delete({
      where: { id: bankAccountId },
    });
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
