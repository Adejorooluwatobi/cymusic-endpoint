import { Controller, Post, Get, Delete, Put, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ArtistGuard } from '../auth/guards/artist.guard';
import { MusicService } from '../../../domain/services/music.service';
import { CreateMusicDto } from '../../../application/dto/music/create-music.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateMusicDto } from 'src/application/dto/music/update-music.dto';
import { CreateMusicParams } from 'src/utils/types';

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(private musicService: MusicService) {}

@Post()
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create music (Artists only)' })
  async create(@Request() req, @Body() createMusicDto: CreateMusicDto) {
    const artistId = this.extractUserId(req.user).id;
    const musicParams: CreateMusicParams = { // Create the complete object
      ...createMusicDto,
      artistId,
      uploadDate: new Date(),
    };
    const music = await this.musicService.create(musicParams); // Pass the single object
    return { succeeded: true, message: 'Music created successfully', resultData: music };
  }

  @Get()
  @ApiOperation({ summary: 'Get all music (Public)' })
  async findAll() {
    const music = await this.musicService.findAll();
    return { succeeded: true, message: 'Music retrieved successfully', resultData: music };
  }

  @Get('artist/:artistId')
  @ApiOperation({ summary: 'Get music by artist (Public)' })
  async findByArtist(@Param('artistId') artistId: string) {
    const music = await this.musicService.findByArtist(artistId);
    return { succeeded: true, message: 'Artist music retrieved successfully', resultData: music };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get music by ID (Public)' })
  async findById(@Param('id') id: string) {
    const music = await this.musicService.findById(id);
    if (!music) throw new NotFoundException('Music not found');
    return { succeeded: true, message: 'Music retrieved successfully', resultData: music };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update music (Artist owner only)' })
  async update(@Request() req, @Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    const artistId = this.extractUserId(req.user).id;
    const result = await this.musicService.update(id, artistId, updateMusicDto);
    if (result.count === 0) throw new NotFoundException('Music not found or access denied');
    return { succeeded: true, message: 'Music updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete music (Artist owner only)' })
  async delete(@Request() req, @Param('id') id: string) {
    const artistId = this.extractUserId(req.user).id;
    const deleted = await this.musicService.delete(id, artistId);
    if (!deleted) throw new NotFoundException('Music not found or access denied');
    return { succeeded: true, message: 'Music deleted successfully' };
  }

  @Post(':id/save-to-playlist/:playlistId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save music to playlist' })
  async saveToPlaylist(@Request() req, @Param('id') musicId: string, @Param('playlistId') playlistId: string) {
    const userInfo = this.extractUserId(req.user);
    await this.musicService.saveToPlaylist(musicId, playlistId, userInfo.id);
    return { succeeded: true, message: 'Music saved to playlist successfully' };
  }

  @Delete(':id/remove-from-playlist/:playlistId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove music from playlist' })
  async removeFromPlaylist(@Request() req, @Param('id') musicId: string, @Param('playlistId') playlistId: string) {
    const userInfo = this.extractUserId(req.user);
    await this.musicService.removeFromPlaylist(musicId, playlistId, userInfo.id);
    return { succeeded: true, message: 'Music removed from playlist successfully' };
  }

  private extractUserId(user: any): { id: string; type: string } {
    if (user.user?.id) return { id: user.user.id, type: 'user' };
    if (user.admin?.id) return { id: user.admin.id, type: 'admin' };
    if (user.superAdmin?.id) return { id: user.superAdmin.id, type: 'superAdmin' };
    if (user.artist?.id) return { id: user.artist.id, type: 'artist' };
    throw new NotFoundException('User ID not found in token');
  }
}