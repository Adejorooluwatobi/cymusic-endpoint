import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PlaylistService } from '../../../domain/services/playlist.service';
import { CreatePlaylistDto } from '../../../application/dto/playlist/create-playlist.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Playlists')
@Controller('playlists')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post()
  @ApiOperation({ summary: 'Create playlist (All authenticated users)' })
  async create(@Request() req, @Body() createPlaylistDto: CreatePlaylistDto) {
    const userInfo = this.extractUserId(req.user);
    const playlist = await this.playlistService.create(userInfo.id, userInfo.type, createPlaylistDto);
    return { succeeded: true, message: 'Playlist created successfully', resultData: playlist };
  }

  @Get()
  @ApiOperation({ summary: 'Get my playlists' })
  async findByUser(@Request() req) {
    const userInfo = this.extractUserId(req.user);
    const playlists = await this.playlistService.findByUser(userInfo.id, userInfo.type);
    return { succeeded: true, message: 'Playlists retrieved successfully', resultData: playlists };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get playlist by ID (Public)' })
  async findById(@Param('id') playlistId: string) {
    const playlist = await this.playlistService.findById(playlistId);
    if (!playlist) throw new Error('Playlist not found');
    return { succeeded: true, message: 'Playlist retrieved successfully', resultData: playlist };
  }

  @Post(':id/music/:musicId')
  @ApiOperation({ summary: 'Add music to playlist (Playlist owner only)' })
  async addMusic(@Request() req, @Param('id') playlistId: string, @Param('musicId') musicId: string) {
    const userInfo = this.extractUserId(req.user);
    await this.playlistService.addMusic(playlistId, musicId, userInfo.id, userInfo.type);
    return { succeeded: true, message: 'Music added to playlist successfully' };
  }

  @Delete(':id/music/:musicId')
  @ApiOperation({ summary: 'Remove music from playlist (Playlist owner only)' })
  async removeMusic(@Request() req, @Param('id') playlistId: string, @Param('musicId') musicId: string) {
    const userInfo = this.extractUserId(req.user);
    await this.playlistService.removeMusic(playlistId, musicId, userInfo.id, userInfo.type);
    return { succeeded: true, message: 'Music removed from playlist successfully' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete playlist (Playlist owner only)' })
  async deletePlaylist(@Request() req, @Param('id') playlistId: string) {
    const userInfo = this.extractUserId(req.user);
    await this.playlistService.deletePlaylist(playlistId, userInfo.id, userInfo.type);
    return { succeeded: true, message: 'Playlist deleted successfully' };
  }

  private extractUserId(user: { user?: { id: string }; admin?: { id: string }; superAdmin?: { id: string }; artist?: { id: string } }): { id: string; type: string } {
    if (user.user?.id) return { id: user.user.id, type: 'user' };
    if (user.admin?.id) return { id: user.admin.id, type: 'admin' };
    if (user.superAdmin?.id) return { id: user.superAdmin.id, type: 'superAdmin' };
    if (user.artist?.id) return { id: user.artist.id, type: 'artist' };
    throw new Error('User ID not found in token');
  }
}