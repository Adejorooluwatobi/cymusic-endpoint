import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/domain/services/admin.service';
import { ArtistService } from 'src/domain/services/artist.service';
import { SuperAdminService } from 'src/domain/services/super-admin.service';
import { UserService } from 'src/domain/services/user.service';

interface AuthResponse {
  access_token: string;
  user?: { isAdmin: boolean; isActive: boolean; name: string; role: string };
  admin?: { isAdmin: boolean; isActive: boolean; name: string; role: string };
  superAdmin?: { isAdmin: boolean; isActive: boolean; name: string; role: string };
  artist?: { isAdmin: boolean; isActive: boolean; name: string; role: string };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecret: string;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
    private adminService: AdminService,
    private artistService: ArtistService,
    private superAdminService: SuperAdminService,
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET') || 'your_super_secret_jwt_key_change_in_production';
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async registerUser(email: string, hashedPassword: string): Promise<void> {
    await this.userService.createUser({
      email,
      password: hashedPassword,
      displayName: '',
      isActive: true,
      isVerified: false,
    });
  }
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
      }

      const payload = { sub: user.id, email: user.email, role: 'user' };
      const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });

      return {
        access_token: accessToken,
        user: {isAdmin: false, isActive: user.isActive, name: user.displayName, role: 'USER' },
      };
    } catch (error) {
      this.logger.error('User login error', error);
      throw error;
    }
  }

  async registerAdmin(_email: string, _hashedPassword: string): Promise<void> {
    // TODO: Implement admin registration
    await this.adminService.createAdmin({
      email: _email,
      password: _hashedPassword,
      displayName: '',
    });
  }

  async loginAdmin(_email: string, _password: string): Promise<AuthResponse> {
    try {
      const admin = await this.adminService.findByEmail(_email);
      if (!admin || !admin.password || !(await bcrypt.compare(_password, admin.password))) {
        throw new Error('Invalid email or password');
      }
      const payload = { sub: admin.id, email: admin.email, role: 'admin' };
      const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });
      return { access_token: accessToken, admin: { isAdmin: true, isActive: admin.isActive, name: admin.displayName, role: 'ADMIN' } };
    } catch (error) {
      this.logger.error('Admin login error', error);
      throw error;
    }
  }

  async registerSuperAdmin(_email: string, _hashedPassword: string): Promise<void> {
    // TODO: Implement super admin registration
    await this.superAdminService.createSuperAdmin({
      email: _email,
      password: _hashedPassword,
      displayName: '',
    });
  }

  async loginSuperAdmin(_email: string, _password: string): Promise<AuthResponse> {
    try {
      const superAdmin = await this.superAdminService.findByEmail(_email);
      if (!superAdmin || !superAdmin.password || !(await bcrypt.compare(_password, superAdmin.password))) {
        throw new Error('Invalid email or password');
      }
      const payload = { sub: superAdmin.id, email: superAdmin.email, role: 'super_admin' };
      const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });
      return { access_token: accessToken, superAdmin: { isAdmin: true, isActive: superAdmin.isActive, name: superAdmin.displayName, role: 'SUPER_ADMIN' } };
    } catch (error) {
      this.logger.error('SuperAdmin login error', error);
      throw error;
    }
  }

  async registerArtist(_email: string, _hashedPassword: string): Promise<void> {
    // TODO: Implement artist registration
    await this.artistService.createArtist({
      email: _email,
      password: _hashedPassword,
      displayName: '',
    });
  }

  async loginArtist(_email: string, _password: string): Promise<AuthResponse> {
    try {
      const artist = await this.artistService.findByEmail(_email);
      if (!artist || !artist.password || !(await bcrypt.compare(_password, artist.password))) {
        throw new Error('Invalid email or password');
      }
      const payload = { sub: artist.id, email: artist.email, role: 'artist' };
      const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });
      return { access_token: accessToken, artist: { isAdmin: false, isActive: artist.isActive, name: artist.displayName, role: 'ARTIST' } };
    } catch (error) {
      this.logger.error('Artist login error', error);
      throw error;
    }
  }
}