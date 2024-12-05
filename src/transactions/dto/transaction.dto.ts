import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  senderAccountNumber: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  receiverAccountNumber: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  amount: number;
  @ApiProperty()
  @IsNotEmpty()
  transactionType: TransactionType;
}
