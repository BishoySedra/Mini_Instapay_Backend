import {
  Controller,
  UseGuards,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) { }

  @Get('users')
  @ApiOperation({ summary: 'Get paginated list of users' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Number of users per page', type: Number })
  @ApiResponse({ status: 200, description: 'Paginated list of users returned successfully' })
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
  @ApiOperation({ summary: 'Suspend a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User suspended successfully' })
  async suspendUser(@Param('id') userId: string) {
    return await this.adminService.suspendUser(userId);
  }

  @Get('pending-transactions')
  @ApiOperation({ summary: 'Get all pending transactions' })
  @ApiResponse({ status: 200, description: 'Pending transactions retrieved successfully' })
  async showPendingTransactions() {
    const transactions = await this.adminService.getPendingTransactions();
    return { message: 'showing pending transactions', data: transactions };
  }

  @Patch('suspendTransaction/:id')
  @ApiOperation({ summary: 'Suspend a transaction by ID' })
  @ApiParam({ name: 'id', description: 'Transaction ID', type: String })
  @ApiResponse({ status: 200, description: 'Transaction suspended successfully' })
  async suspendTransaction(@Param('id') transactionId: string) {
    await this.adminService.suspendTransaction(transactionId);
    return { message: 'transaction suspended' };
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Monitor paginated transactions' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Number of transactions per page', type: Number })
  @ApiResponse({ status: 200, description: 'Paginated transactions retrieved successfully' })
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
  @ApiOperation({ summary: 'Get user details including bank accounts and transactions' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User details retrieved successfully' })
  async viewUser(@Param('id') id: string) {
    const data = await this.adminService.getUserDetails(id);
    return { message: 'showing user accounts and transactions', data };
  }

  @Get('report')
  @ApiOperation({ summary: 'Generate a report of all transactions' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  async generateReport() {
    const report = await this.adminService.generateReport();
    return { message: 'report generated', data: report };
  }

  @Get('allBankAccounts')
  @ApiOperation({ summary: 'Get all bank accounts' })
  @ApiResponse({ status: 200, description: 'Bank accounts retrieved successfully' })
  async getAllAccounts() {
    const accounts = await this.adminService.getAllBankAccounts();
    return { message: 'bank accounts returned successfuly', accounts };
  }
}
