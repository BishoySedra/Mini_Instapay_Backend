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
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}
  @Get('show-all')
  async showAllTransactions(@Req() req: Request) {
    const transactions = await this.transactionsService.showUserTransactions(
      req.user,
    );
    return { message: 'showing all transactions', data: transactions };
  }

  @Post('make-transaction')
  async makeTransaction(@Req() req: Request, @Body() body: TransactionDTO) {
    // console.log('Initiating transaction request:', body);
    try {
      const transaction = await this.transactionsService.makeTransaction(
        req.user,
        body.senderAccountNumber,
        body.receiverAccountNumber,
        body.amount,
        body.transactionType,
      );
      // console.log('Transaction successful:', transaction);
      return { message: 'Transaction successful', data: transaction };
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  @Get('show-refunds')
  async showRefundRequests(@Req() req: Request) {
    const refunds = await this.transactionsService.showRefundRequests(req.user);
    return { message: 'showing refund requests', data: refunds };
  }

  @Post('accept-refund/:id')
  async acceptRefund(@Param('id') id: string) {
    const refund = await this.transactionsService.acceptRefund(id);
    return { message: 'refund accepted', data: refund };
  }
}
