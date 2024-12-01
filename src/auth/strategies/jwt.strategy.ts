import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  validate(payload: any) {
    // console.log(process.env.SECRET_KEY);
    return {
      id: payload.id,
      email: payload.email,
      name: payload.email,
      isAdmin: payload.isAdmin,
    };
  }
}
