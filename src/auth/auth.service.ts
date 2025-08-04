import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from './utils/helpers';
import { AuthRepository } from './auth.repository';
import { Prisma } from '@prisma/client';
import { RegisterPayloadDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) { }

  async createUser(data: RegisterPayloadDTO) {

    const { email, password, name, phone, address } = data;

    const isFound = await this.authRepository.findUserByEmail(email);

    if (isFound) {
      throw new UnauthorizedException('this email is already taken');
    }

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
    phone: string;
    address: string;
  }) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
    };
    return this.jwtService.sign(payload);
  }
}
