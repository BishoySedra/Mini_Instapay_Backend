import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { RegisterPayloadDTO } from './dto/register.dto';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) { }

  async createUser(data: RegisterPayloadDTO): Promise<User> {

    const { email, password, name, phone, address } = data;

    return this.prisma.user.create({
      data: {
        email,
        password, // Ensure this is hashed before saving
        name,
        phone,
        address,
      }
    });

  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
