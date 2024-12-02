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
import { TransactionType } from '@prisma/client';
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
  @Post('instant-transaction')
  async makeInstantTransaction(
    @Req() req: Request,
    @Body()
    body: {
      senderAccountNumber: string;
      receiverAccountNumber: string;
      amount: number;
      transactionType: TransactionType;
    },
  ) {
    const transaction = await this.transactionsService.makeTransaction(
      req.user,
      body.senderAccountNumber,
      body.receiverAccountNumber,
      body.amount,
      body.transactionType,
    );
    return { message: 'transaction successful', data: transaction };
  }
  @Post('send-money')
  async sendMoney(
    @Req() req: Request,
    @Body()
    body: {
      senderAccountNumber: string;
      receiverAccountNumber: string;
      amount: number;
      transactionType: TransactionType;
    },
  ) {
    const transaction = await this.transactionsService.makeTransaction(
      req.user,
      body.senderAccountNumber,
      body.receiverAccountNumber,
      body.amount,
      body.transactionType,
    );
    return { message: 'transaction successful', data: transaction };
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
