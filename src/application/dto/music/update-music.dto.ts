import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMusicDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Music title', required: false })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  artistId?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Audio file URL', required: false })
  audioFileUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Cover image URL', required: false })
  coverImageUrl?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  uploadDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Music genre', required: false })
  genreId?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Music duration', required: false })
  duration?: number;
}