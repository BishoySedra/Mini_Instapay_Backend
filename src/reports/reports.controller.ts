import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('transaction-summary')
  async transactionSummary(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.reportsService.getTransactionSummary(startDate, endDate);
  }
  @Get('account-usage')
  async accountUsage(@Query('userId') userId: string) {
    return await this.reportsService.getAccountUsage(userId);
  }
}
