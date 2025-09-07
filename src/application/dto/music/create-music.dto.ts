import { IsString, IsOptional, IsDate, IsNumber, IsBoolean, IsIn, IsUUID, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'Music title' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Audio file URL', required: false })
  audioFileUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Cover image URL', required: false })
  coverImageUrl?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Genre ID', required: false })
  genreId?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Music duration in seconds', required: false })
  duration?: number;

  @IsIn(['low', 'medium', 'high', 'lossless'])
  @IsOptional()
  @ApiProperty({ description: 'Audio quality', enum: ['low', 'medium', 'high', 'lossless'] })
  quality?: 'low' | 'medium' | 'high' | 'lossless';

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'File size in bytes' })
  fileSize: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Is explicit content', required: false, default: false })
  isExplicit?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Is premium content', required: false, default: false })
  isPremium?: boolean;
}