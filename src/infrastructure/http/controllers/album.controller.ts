import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ArtistGuard } from '../auth/guards/artist.guard';
import { AlbumService } from '../../../domain/services/album.service';
import { CreateAlbumDto } from '../../../application/dto/album/create-album.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create album (Artists only)' })
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto, @Request() req: any) {
    const artistId = this.extractUserId(req.user).id;
    const album = await this.albumService.createAlbum(createAlbumDto, artistId);
    return { succeeded: true, message: 'Album created successfully', resultData: album };
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums (Public)' })
  async getAllAlbums() {
    const albums = await this.albumService.getAllAlbums();
    return { succeeded: true, message: 'Albums retrieved successfully', resultData: albums };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID (Public)' })
  async getAlbumById(@Param('id') id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) throw new NotFoundException('Album not found');
    return { succeeded: true, message: 'Album retrieved successfully', resultData: album };
  }

  @Get('artist/:artistId')
  @ApiOperation({ summary: 'Get albums by artist (Public)' })
  async getAlbumsByArtist(@Param('artistId') artistId: string) {
    const albums = await this.albumService.getAlbumsByArtist(artistId);
    return { succeeded: true, message: 'Artist albums retrieved successfully', resultData: albums };
  }

  @Post(':id/music/:musicId')
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add music to album (Album owner only)' })
  async addMusicToAlbum(@Request() req: any, @Param('id') albumId: string, @Param('musicId') musicId: string) {
    const artistId = this.extractUserId(req.user).id;
    await this.albumService.addMusicToAlbum(albumId, musicId, artistId);
    return { succeeded: true, message: 'Music added to album successfully' };
  }

  @Delete(':id/music/:musicId')
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove music from album (Album owner only)' })
  async removeMusicFromAlbum(@Request() req: any, @Param('id') albumId: string, @Param('musicId') musicId: string) {
    const artistId = this.extractUserId(req.user).id;
    await this.albumService.removeMusicFromAlbum(albumId, musicId, artistId);
    return { succeeded: true, message: 'Music removed from album successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ArtistGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete album (Album owner only)' })
  async deleteAlbum(@Request() req: any, @Param('id') id: string) {
    const artistId = this.extractUserId(req.user).id;
    await this.albumService.deleteAlbum(id, artistId);
    return { succeeded: true, message: 'Album deleted successfully' };
  }

  @Post(':id/save-to-playlist/:playlistId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save entire album to playlist' })
  async saveAlbumToPlaylist(@Request() req: any, @Param('id') albumId: string, @Param('playlistId') playlistId: string) {
    const userInfo = this.extractUserId(req.user);
    await this.albumService.saveAlbumToPlaylist(albumId, playlistId, userInfo.id);
    return { succeeded: true, message: 'Album saved to playlist successfully' };
  }

  private extractUserId(user: any): { id: string; type: string } {
    if (user.user?.id) return { id: user.user.id, type: 'user' };
    if (user.admin?.id) return { id: user.admin.id, type: 'admin' };
    if (user.superAdmin?.id) return { id: user.superAdmin.id, type: 'superAdmin' };
    if (user.artist?.id) return { id: user.artist.id, type: 'artist' };
    throw new Error('User ID not found in token');
  }
}