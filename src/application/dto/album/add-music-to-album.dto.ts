import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class AddMusicToAlbumDto {
  @ApiProperty({ 
    description: 'Array of music IDs to add to the album',
    example: ['music-id-1', 'music-id-2', 'music-id-3'],
    type: [String]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  musicIds: string[];
}