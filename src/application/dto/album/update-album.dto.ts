import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the album',
    example: 'My Favorite Hits',
  })
  title?: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Array of music IDs to be included in the album',
  //   example: ['musicId1', 'musicId2'],
  //   required: false,
  // })
  // music?: string[];
    @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Album cover image URL',
    example: 'http://example.com/cover.jpg',
    required: false,
  })
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the album',
    example: 'A collection of my favorite songs from the 90s',
    required: false,
  })
  description?: string;

  // @IsOptional()
  // @IsString()
  // @ApiProperty({
  //   description: 'User ID of the album owner',
  //   example: '12345',
  //   required: false,
  // })
  // userId?: string;
}