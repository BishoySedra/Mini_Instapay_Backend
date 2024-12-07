import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from './utils/helpers';
import { AuthRepository } from './auth.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    const { email, password, name, phone, address } = data;
    return await this.authRepository.createUser({
      email,
      password,
      name,
      phone,
      address,
    });
  }

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
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
