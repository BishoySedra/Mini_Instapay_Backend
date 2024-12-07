import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReportsService } from './reports.service';
import { Request } from 'express';
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
  async accountUsage(@Req() req: Request) {
    const user = req.user;
    return await this.reportsService.getAccountUsage(user);
  }
}
