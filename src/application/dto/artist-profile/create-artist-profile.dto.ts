import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistProfileDto {
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
}
