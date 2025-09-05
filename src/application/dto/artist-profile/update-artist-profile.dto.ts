import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateArtistProfileDto {
	@IsString()
	@IsOptional()
	@ApiProperty({description: 'Artist ID', example: 'artist-uuid', required: false})
	artistId?: string;

	@IsOptional()
	@IsString()
	@ApiProperty({description: 'Country', example: 'Nigeria', required: false})
	country?: string | null = null;

	@IsOptional()
	@IsString()
	@ApiProperty({description: 'Bio', example: 'Afrobeat artist', required: false})
	bio?: string | null = null;

	@IsOptional()
	@IsString()
	@ApiProperty({description: 'Profile image URL', example: 'http://example.com/image.jpg', required: false})
	profileImageUrl?: string | null = null;

	@IsOptional()
	@ApiProperty({description: 'Is verified', example: false, required: false})
	isVerified?: boolean;

	@IsOptional()
	@ApiProperty({description: 'Number of active followers', example: 100, required: false})
	activeFollowers?: number;
}

