import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateArtistProfileDto {
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
}

