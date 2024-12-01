import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
