import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  displayName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  googleId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  appleId?: string;
}