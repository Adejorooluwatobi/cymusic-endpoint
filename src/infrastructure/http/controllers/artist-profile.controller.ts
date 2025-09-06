import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ArtistProfileService } from '../../../domain/services/artist-profile.service';
import { CreateArtistProfileDto } from '../../../application/dto/artist-profile/create-artist-profile.dto';
import { UpdateArtistProfileDto } from '../../../application/dto/artist-profile/update-artist-profile.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('ArtistProfile')
@Controller('artist-profile')
export class ArtistProfileController {
  constructor(private readonly artistProfileService: ArtistProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create artist profile' })
  async create(@Body() artistProDetails: CreateArtistProfileDto) {
    return await this.artistProfileService.createArtistProfile(artistProDetails);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist profile by ID' })
  async getById(@Param('id') id: string) {
    return await this.artistProfileService.getArtistProfileById(id);
  }

  @Get('artist/:artistId')
  @ApiOperation({ summary: 'Get artist profile by artist ID' })
  async getByArtistId(@Param('artistId') artistId: string) {
    return await this.artistProfileService.getArtistProfileByArtistId(artistId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist profile' })
  async update(@Param('id') id: string, @Body() artistProDetails: UpdateArtistProfileDto) {
    return await this.artistProfileService.updateArtistProfile(id, artistProDetails);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist profile' })
  async delete(@Param('id') id: string) {
    await this.artistProfileService.deleteArtistProfile(id);
    return { succeeded: true, message: 'Artist profile deleted successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all artist profiles' })
  async getAll() {
    return await this.artistProfileService.getAllArtistProfiles();
  }
}
