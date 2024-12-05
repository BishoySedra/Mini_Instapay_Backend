import { IsNumber, IsPositive, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LinkBankAccountDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly accountNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly bankName: string;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsPositive()
  readonly balance: number;
}
