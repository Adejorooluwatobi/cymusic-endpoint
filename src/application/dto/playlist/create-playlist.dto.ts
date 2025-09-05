import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsString()
  @ApiProperty({ description: 'Playlist name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Playlist description', required: false })
  description?: string;
}