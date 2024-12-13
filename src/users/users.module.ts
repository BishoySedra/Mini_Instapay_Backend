// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { UserFactory } from './users.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    UsersService,
    JwtStrategy,
    PrismaService,
    UsersRepository,
    UserFactory,
    JwtService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
