import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
// import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { RegisterPayloadDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  // console.log('incoming request to login server');
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    console.log('aloooo');
    const user = req.user as {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
    };
    const token = this.authService.generateJwt(user);
    return { message: 'login successful', token, user };
  }

  @Post('signup')
  async signup(@Body() registerPayloadDto: RegisterPayloadDTO) {
    const user = await this.authService.createUser(registerPayloadDto);
    return {
      message: 'Signup successful',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
