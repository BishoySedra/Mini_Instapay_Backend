import { IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  readonly dailyLimit: number;
  @IsOptional()
  readonly phone: string;
  @IsOptional()
  readonly address: string;
}
