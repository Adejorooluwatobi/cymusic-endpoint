import { Controller, Get, Post, Body, Param, ValidationPipe, Delete, Put } from '@nestjs/common';
import { ArtistService } from '../../../domain/services/artist.service';
import { CreateArtistDto } from '../../../application/dto/artist/create-artist.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  async create(@Body(new ValidationPipe) createArtistDto: CreateArtistDto) {
    const artist = await this.artistService.createArtist(createArtistDto);
    if (!artist) {
      throw new Error('Artist creation failed');
    }
    return {
      succeeded: true,
      message: 'Artist created successfully',
      resultData: artist
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all artists' })
  async findAll() {
    const artists = await this.artistService.findAllArtist();
    return {
      succeeded: true,
      message: 'Artists retrieved successfully',
      resultData: artists
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an artist by ID' })
  async findOne(@Param('id') id: string) {
    const artist = await this.artistService.findOneArtist(id);
    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Artist retrieved successfully',
      resultData: artist
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an artist by ID' })
  async update(@Param('id') id: string, @Body() updateArtistDto: Partial<CreateArtistDto>) {
    const artist = await this.artistService.updateArtist(id, updateArtistDto);
    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Artist updated successfully',
      resultData: artist
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an artist by ID' })
  async delete(@Param('id') id: string) {
    await this.artistService.deleteArtist(id);
    return {
      succeeded: true,
      message: 'Artist deleted successfully'
    };
  }
}