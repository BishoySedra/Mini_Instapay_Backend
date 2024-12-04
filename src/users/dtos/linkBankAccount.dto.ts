import { IsNumber, IsPositive, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LinkBankAccountDTO {
  @IsString()
  @IsNotEmpty()
  readonly accountNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly bankName: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsPositive()
  readonly balance: number;
}
