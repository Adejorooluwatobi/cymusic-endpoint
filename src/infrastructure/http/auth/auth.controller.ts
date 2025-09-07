import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminRegisterDto, ArtistRegisterDto, SuperAdminRegisterDto, UserRegisterDto } from './dto/register.dto';
import { AdminAccessTokenDto, ArtistAccessTokenDto, SuperAdminAccessTokenDto, UserAccessTokenDto } from './dto/access-token.dto';
import { AdminLoginDto, ArtistLoginDto, SuperAdmnLoginDto, UserLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  async registerUser(@Body() registerDto: UserRegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerUser(registerDto.email, hashedPassword);
    return 'User registered successfully';
  }

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() loginDto: UserLoginDto): Promise<UserAccessTokenDto> {
    const token = await this.authService.loginUser(loginDto.email, loginDto.password);
    return { 
      accessToken: token.access_token, 
      isActive: token.user?.isActive || false, 
      displayName: token.user?.name || '' ,
      role: token.user?.role || 'user'
    };
  }

  @Post('admin/register')
  async registerAdmin(@Body() registerDto: AdminRegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerAdmin(registerDto.email, hashedPassword);
    return 'Admin registered successfully';
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() loginDto: AdminLoginDto): Promise<AdminAccessTokenDto> {
    const token = await this.authService.loginAdmin(loginDto.email, loginDto.password);
    return {
      accessToken: token.access_token,
      isActive: token.admin?.isActive || false,
      displayName: token.admin?.name || '' ,
      role: token.admin?.role || 'admin'
    };
  }

  @Post('super-admin/register')
  async registerSuperAdmin(@Body() registerDto: SuperAdminRegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerSuperAdmin(registerDto.email, hashedPassword);
    return 'Super Admin registered successfully';
  }

  @Post('super-admin/login')
  @HttpCode(HttpStatus.OK)
  async superAdminLogin(@Body() loginDto: SuperAdmnLoginDto): Promise<SuperAdminAccessTokenDto> {
    const token = await this.authService.loginSuperAdmin(loginDto.email, loginDto.password);
    return {
      accessToken: token.access_token,
      isActive: token.superAdmin?.isActive || false,
      displayName: token.superAdmin?.name || '' ,
      role: token.superAdmin?.role || 'super-admin'
    };
  }

  @Post('artist/register')
  async registerArtist(@Body() registerDto: ArtistRegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerArtist(registerDto.email, hashedPassword);
    return 'Artist registered successfully';
  }

  @Post('artist/login')
  @HttpCode(HttpStatus.OK)
  async artistLogin(@Body() loginDto: ArtistLoginDto): Promise<ArtistAccessTokenDto> {
    const token = await this.authService.loginArtist(loginDto.email, loginDto.password);
    return {
      accessToken: token.access_token,
      isActive: token.artist?.isActive || false,
      displayName: token.artist?.name || '' ,
      role: token.artist?.role || 'artist'
    };
  }
}