import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [UsersService, JwtStrategy, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
