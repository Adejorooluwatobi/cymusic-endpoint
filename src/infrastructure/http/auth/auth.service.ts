import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
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
  private readonly jwtSecret: string;

  constructor(
    // private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
    private adminService: AdminService,
    private artistService: ArtistService,
    private superAdminService: SuperAdminService,

  ) {
    // this.jwtSecret = this.configService.get<string>('JWT_SECRET') || '';
    // if (!this.jwtSecret) {
    //   throw new Error('JWT_SECRET is not defined in environment variables.');
    // }
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
    const user = await this.userService.findOneUser(email);
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const payload = { email: user.email, role: 'USER' };
    const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });

    return {
      access_token: accessToken,
      user: {isAdmin: false, isActive: user.isActive, name: user.displayName, role: 'USER' },
    };
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
    const admin = await this.adminService.findOneAdmin(_email);
    if (!admin || !admin.password || !(await bcrypt.compare(_password, admin.password))) {
      throw new Error('Invalid email or password');
    }
    const payload = { email: admin.email };
    const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });
    return { access_token: accessToken, admin: { isAdmin: true, isActive: admin.isActive, name: admin.displayName, role: 'ADMIN' } };
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
    const superAdmin = await this.superAdminService.findOneSuperAdmin(_email);
    if (!superAdmin || !superAdmin.password || !(await bcrypt.compare(_password, superAdmin.password))) {
      throw new Error('Invalid email or password');
    }
    const payload = { email: superAdmin.email };
    const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });
    return { access_token: accessToken, superAdmin: { isAdmin: true, isActive: superAdmin.isActive, name: superAdmin.displayName, role: 'SUPER_ADMIN' } };
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
    const artist = await this.artistService.findOneArtist(_email);
    if (!artist || !artist.password || !(await bcrypt.compare(_password, artist.password))) {
      throw new Error('Invalid email or password');
    }
    const payload = { email: artist.email };
    const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret });
    return { access_token: accessToken, artist: { isAdmin: false, isActive: artist.isActive, name: artist.displayName, role: 'ARTIST' } };
  }
}