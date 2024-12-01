import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  validate(email: string, password: string) {
    // console.log('validating user');
    const user = this.authService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
