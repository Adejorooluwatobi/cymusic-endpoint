import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../modules/user.module';
import { AdminModule } from '../modules/admin.module';
import { ArtistModule } from '../modules/artist.module';
import { SuperAdminModule } from '../modules/super-admin.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AdminModule,
    ArtistModule,
    SuperAdminModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}