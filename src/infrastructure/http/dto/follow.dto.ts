import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FollowArtistDto {
  @ApiProperty({ description: 'ID of the artist to follow/unfollow' })
  @IsString()
  @IsNotEmpty()
  artistId: string;
}