import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @IsString()
  @ApiProperty({ description: 'Music title' })
  title: string;

  @IsString()
  @ApiProperty()
  artistId: string

  @IsString()
  @ApiProperty({ description: 'Audio file URL' })
  audioFileUrl: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Cover image URL', required: false })
  coverImageUrl?: string;

  @IsDate()
  @ApiProperty()
  uploadDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Music genre', required: false })
  genre?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Music duration', required: false })
  duration?: number;
}