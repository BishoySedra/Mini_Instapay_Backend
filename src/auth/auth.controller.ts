import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { RegisterPayloadDTO } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'User login', description: 'Authenticate a user and return a JWT token.' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns the user details and JWT token.',
    schema: {
      example: {
        message: 'login successful',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '123',
          email: 'user@example.com',
          name: 'John Doe',
          isAdmin: false,
          phone: '1234567890',
          address: '123 Main St',
        },
      },
    },
  })
  login(@Req() req: Request) {
    const user = req.user as {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
      phone: string;
      address: string;
    };
    const token = this.authService.generateJwt(user);
    return { message: 'login successful', token, user };
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup', description: 'Register a new user and return their details.' })
  @ApiBody({
    description: 'Payload for user registration',
    schema: {
      example: {
        email: 'user@example.com',
        password: 'securepassword',
        name: 'John Doe',
        phone: '1234567890',
        address: '123 Main St',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Signup successful. Returns the newly created user details.',
    schema: {
      example: {
        message: 'Signup successful',
        user: {
          id: '123',
          email: 'user@example.com',
          name: 'John Doe',
        },
      },
    },
  })
  async signup(@Body() registerPayloadDto: RegisterPayloadDTO) {
    const user = await this.authService.createUser(registerPayloadDto);
    return {
      message: 'Signup successful',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
