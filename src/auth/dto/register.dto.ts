import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class RegisterPayloadDTO {
  @ApiProperty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @Transform(({ value }) => String(value))
  @IsString()
  readonly phone: string;
  @ApiProperty()
  @IsString()
  readonly email: string;
  @ApiProperty()
  @IsString()
  readonly password: string;
  @ApiProperty()
  @IsString()
  readonly address: string;
}
