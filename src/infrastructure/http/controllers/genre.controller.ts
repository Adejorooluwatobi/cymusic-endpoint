import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { GenreService } from '../../../domain/services/genre.service';
import { CreateGenreDto } from '../../../application/dto/genre/create-genre.dto';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres (Public)' })
  async getAllGenres() {
    const genres = await this.genreService.getAllGenres();
    return { succeeded: true, message: 'Genres retrieved successfully', resultData: genres };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by ID (Public)' })
  async getGenreById(@Param('id') id: string) {
    const genre = await this.genreService.getGenreById(id);
    return { succeeded: true, message: 'Genre retrieved successfully', resultData: genre };
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create genre (Admin only)' })
  async createGenre(@Body(ValidationPipe) createGenreDto: CreateGenreDto) {
    const genre = await this.genreService.createGenre(createGenreDto);
    return { succeeded: true, message: 'Genre created successfully', resultData: genre };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update genre (Admin only)' })
  async updateGenre(@Param('id') id: string, @Body(ValidationPipe) updateData: Partial<CreateGenreDto>) {
    const genre = await this.genreService.updateGenre(id, updateData);
    return { succeeded: true, message: 'Genre updated successfully', resultData: genre };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete genre (Admin only)' })
  async deleteGenre(@Param('id') id: string) {
    await this.genreService.deleteGenre(id);
    return { succeeded: true, message: 'Genre deleted successfully' };
  }
}