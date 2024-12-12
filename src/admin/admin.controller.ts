import {
  Controller,
  UseGuards,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('users')
  async getPaginatedUsers(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.adminService.getUsers(
      Number(page) || 1,
      Number(pageSize) || 10,
    );
  }

  @Patch('suspendUser/:id')
  async suspendUser(@Param('id') userId: string) {
    return await this.adminService.suspendUser(userId);
  }
  @Get('pending-transactions')
  async showPendingTransactions() {
    const transactions = await this.adminService.getPendingTransactions();
    return { message: 'showing pending transactions', data: transactions };
  }
  @Patch('suspendTransaction/:id')
  async suspendTransaction(@Param('id') transactionId: string) {
    await this.adminService.suspendTransaction(transactionId);
    return { message: 'transaction suspended' };
  }

  @Get('transactions')
  async monitorTransactions(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const transactions = await this.adminService.monitorTransactions(
      Number(page) || 1,
      Number(pageSize) || 10,
    );
    return { message: 'showing transactions', data: transactions };
  }

  @Get('userDetails/:id')
  async viewUser(@Param('id') id: string) {
    const data = await this.adminService.getUserDetails(id);
    return { message: 'showing user accounts and transactions', data };
  }

  @Get('report')
  async generateReport() {
    const report = await this.adminService.generateReport();
    return { message: 'report generated', data: report };
  }
  @Get('allBankAccounts')
  async getAllAccounts() {
    const accounts = await this.adminService.getAllBankAccounts();
    return { message: 'bank accounts returned successfuly', accounts };
  }
}
