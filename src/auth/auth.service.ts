import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { verifyPassword } from './utils/helpers';

@Injectable()
export class AuthService {
  // private static instance: AuthService;

  /*
  private constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
    */

  // static getInstance(): AuthService {
  //   if (!AuthService.instance) {
  //     AuthService.instance = new AuthService(private jwtService: JwtService, private prisma: PrismaService);
  //   }
  //   return AuthService.instance;
  // }
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { email, password, name, phone, address } = data;
    return await this.prisma.user.create({
      data: { email, password, name, phone, address },
    });
  }

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!findUser) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await verifyPassword(password, findUser.password);

    if (!isPasswordValid) throw new UnauthorizedException('invalid credents');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = findUser;
    return userWithoutPassword;
  }
  generateJwt(user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
  }) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    return this.jwtService.sign(payload);
  }
}
