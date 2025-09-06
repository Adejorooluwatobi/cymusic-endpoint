import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistProfileDto {
  @IsString()
  @ApiProperty({ description: 'Artist ID', example: 'artist-uuid' })
  artistId: string;

  @IsNumber()
  @ApiProperty({ description: 'Number of active followers', example: 100 })
  activeFollowers: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Country', example: 'Nigeria', required: false })
  country?: string | null = null;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Bio', example: 'Afrobeat artist', required: false })
  bio?: string | null = null;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Profile image URL', example: 'http://example.com/image.jpg', required: false })
  profileImageUrl?: string | null = null;

  @IsBoolean()
  @ApiProperty({ description: 'Is verified', example: false })
  isVerified: boolean;
}
