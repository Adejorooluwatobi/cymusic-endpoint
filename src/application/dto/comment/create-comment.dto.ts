import { IsString, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'Music ID' })
  musicId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty({ description: 'Comment content', example: 'Great song!' })
  content: string;
}