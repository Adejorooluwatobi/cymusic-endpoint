import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
    });
  }

  async validate(payload: { sub: string; email: string; role: string }) {
    const userData = { 
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
    const adminData = { 
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
    const superAdminData = {
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
    const artistData = {
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };

    if (payload.role === 'user') {
      return { user: userData };
    } else if (payload.role === 'admin') {
      return { admin: adminData };
    } else if (payload.role === 'super_admin') {
      return { superAdmin: superAdminData };
    } else if (payload.role === 'artist') {
      return { artist: artistData };
    } else {
      return { user: userData };
    }
  }
}