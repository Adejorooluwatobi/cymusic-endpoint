import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SearchService } from '../../../domain/services/search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('music')
  @ApiOperation({ summary: 'Search music (Public)' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  @ApiQuery({ name: 'limit', description: 'Results limit', required: false })
  async searchMusic(@Query('q') query: string, @Query('limit') limit?: number) {
    const music = await this.searchService.searchMusic(query);
    const limitedResults = limit ? music.slice(0, Number(limit)) : music;
    return { succeeded: true, message: 'Search completed', resultData: limitedResults };
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular music (Public)' })
  @ApiQuery({ name: 'limit', description: 'Results limit', required: false })
  async getPopularMusic(@Query('limit') limit?: number) {
    const music = await this.searchService.getPopularMusic(Number(limit) || 20);
    return { succeeded: true, message: 'Popular music retrieved', resultData: music };
  }

  @Get('genre/:genreId')
  @ApiOperation({ summary: 'Get music by genre (Public)' })
  async getMusicByGenre(@Param('genreId') genreId: string) {
    const music = await this.searchService.getMusicByGenre(genreId);
    return { succeeded: true, message: 'Genre music retrieved', resultData: music };
  }
}