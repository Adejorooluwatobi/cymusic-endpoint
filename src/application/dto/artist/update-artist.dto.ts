import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsOptional()
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