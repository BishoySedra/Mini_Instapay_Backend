import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  readonly dailyLimit: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => String(value))
  @IsNumber()
  readonly phone: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly address: string;
}
