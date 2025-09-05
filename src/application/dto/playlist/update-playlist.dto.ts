import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Playlist name', required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Playlist description', required: false })
  description?: string;
}