import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  displayName?: string;


  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Indicates if the user is verified' })
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  googleId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  appleId?: string;
}