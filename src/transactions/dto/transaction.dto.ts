import { TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  senderAccountNumber: string;
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  receiverAccountNumber: string;
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  amount: number;
  @IsNotEmpty()
  transactionType: TransactionType;
}
