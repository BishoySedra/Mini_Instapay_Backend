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

@Controller('admin')
@UseGuards(AdminGuard)
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

  @Patch('suspend/:id')
  async suspendUser(@Param('id') userId: string) {
    return await this.adminService.suspendUser(userId);
  }

  @Get('transactions')
  async monitorTransactions(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.adminService.monitorTransactions(page, pageSize);
  }

  @Get('report')
  async generateReport() {
    return await this.adminService.generateReport();
  }
}
