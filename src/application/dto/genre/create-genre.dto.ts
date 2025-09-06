import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ description: 'Genre name', example: 'Hip Hop' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ description: 'Genre description', required: false })
  description?: string;
}