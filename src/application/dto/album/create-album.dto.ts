import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the album',
    example: 'My Favorite Hits',
  })
  title: string;

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