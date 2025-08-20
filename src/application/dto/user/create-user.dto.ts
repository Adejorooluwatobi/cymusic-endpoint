import { IsEmail, IsString, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  googleId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  appleId?: string;
}