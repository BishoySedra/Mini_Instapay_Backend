import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReportsService } from './reports.service';
import { Request } from 'express';

@ApiTags('Reports') // Add a tag for grouping in Swagger
@ApiBearerAuth() // Indicate that endpoints require a Bearer token
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) { }

  @Get('transaction-summary')
  @ApiOperation({ summary: 'Get transaction summary', description: 'Retrieve a summary of transactions within a specified date range.' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in ISO format (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in ISO format (YYYY-MM-DD)', required: true })
  async transactionSummary(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.reportsService.getTransactionSummary(startDate, endDate);
  }

  @Get('account-usage')
  @ApiOperation({ summary: 'Get account usage', description: 'Retrieve account usage statistics for the authenticated user.' })
  async accountUsage(@Req() req: Request) {
    const user = req.user;
    return await this.reportsService.getAccountUsage(user);
  }
}
