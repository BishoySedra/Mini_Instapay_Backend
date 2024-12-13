// users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';
import { UserFactory } from './users.factory';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersFactory: UserFactory,
    private jwtService: JwtService,
  ) {}

  // Link a bank account to the user
  async linkBankAccount(bankAccountData: LinkBankAccountDTO, user) {
    const { accountNumber, bankName, balance } = bankAccountData;

    const existingAccount =
      await this.usersRepository.findByAccountNumber(accountNumber);

    if (existingAccount) {
      throw new BadRequestException('This bank account is already linked.');
    }

    const account = await this.usersRepository.createBankAccount({
      accountNumber,
      bankName,
      balance,
      userId: user.id,
    });

    return this.usersFactory.createBankAccountResponse(account);
  }

  // Unlink a bank account from the user
  async unlinkBankAccount(bankAccountNumber: string, user) {
    const account =
      await this.usersRepository.findByAccountNumber(bankAccountNumber);

    if (!account || account.userId !== user.id) {
      throw new BadRequestException(
        'Account not found or not linked to this user.',
      );
    }

    await this.usersRepository.deleteByAccountNumber(bankAccountNumber);
  }

  // Show all bank accounts for the user
  async showBankAccounts(user) {
    const accounts = await this.usersRepository.findAllByUserId(user.id);

    if (!accounts || accounts.length === 0) {
      throw new BadRequestException('No bank accounts linked to the user.');
    }

    return this.usersFactory.createBankAccountsResponse(accounts);
  }

  // Update the user profile
  async updateProfile(updateData: UpdateUserProfileDto, user) {
    const allowedFields = ['dailyLimit', 'phone', 'address'];
    const updateFields = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined,
      ),
    );
    console.log(updateFields);
    if (Object.keys(updateFields).length === 0) {
      throw new BadRequestException('No valid fields to update.');
    }

    const updatedQueriedUser = await this.usersRepository.updateProfile(
      user.email,
      updateFields,
    );
    const payload: {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
      phone: string;
      address: string;
    } = {
      ...user,
      ...updateFields,
    };
    const token = await this.jwtService.sign(payload);
    const updatedUser =
      this.usersFactory.createUserProfileResponse(updatedQueriedUser);
    return { updatedUser, token };
  }
}
