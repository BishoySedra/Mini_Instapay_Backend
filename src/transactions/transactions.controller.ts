import {
  Controller,
  Req,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TransactionDTO } from './dto/transaction.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) { }

  @Get('show-all')
  @ApiOperation({ summary: 'Show all transactions for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of user transactions' })
  async showAllTransactions(@Req() req: Request) {
    const transactions = await this.transactionsService.showUserTransactions(
      req.user,
    );
    return { message: 'showing all transactions', data: transactions };
  }

  @Post('make-transaction')
  @ApiOperation({ summary: 'Make a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid transaction data' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  async makeTransaction(@Req() req: Request, @Body() body: TransactionDTO) {
    try {
      const transaction = await this.transactionsService.makeTransaction(
        req.user,
        body.senderAccountNumber,
        body.receiverAccountNumber,
        body.amount,
        body.transactionType,
      );
      return { message: 'Transaction successful', data: transaction };
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  @Get('show-refunds')
  @ApiOperation({ summary: 'Show all refund requests for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of refund requests' })
  async showRefundRequests(@Req() req: Request) {
    const refunds = await this.transactionsService.showRefundRequests(req.user);
    return { message: 'showing refund requests', data: refunds };
  }

  @Post('accept-refund/:id')
  @ApiOperation({ summary: 'Accept a refund request' })
  @ApiParam({ name: 'id', description: 'ID of the refund transaction to accept' })
  @ApiResponse({ status: 200, description: 'Refund accepted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid refund request' })
  async acceptRefund(@Param('id') id: string) {
    const refund = await this.transactionsService.acceptRefund(id);
    return { message: 'refund accepted', data: refund };
  }
}
