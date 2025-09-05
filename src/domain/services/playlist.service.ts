import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { CreatePlaylistDto } from '../../application/dto/playlist/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, userType: string, createPlaylistDto: CreatePlaylistDto) {
    const data = {
      name: createPlaylistDto.name,
      description: createPlaylistDto.description,
      ...(userType === 'user' && { userId }),
      ...(userType === 'admin' && { adminId: userId }),
      ...(userType === 'superAdmin' && { superAdminId: userId }),
      ...(userType === 'artist' && { artistId: userId }),
    };

    return this.prisma.playlist.create({ data });
  }

  async findByUser(userId: string, userType: string) {
    const where: Record<string, any> = {};
    if (userType === 'user') where.userId = userId;
    else if (userType === 'admin') where.adminId = userId;
    else if (userType === 'superAdmin') where.superAdminId = userId;
    else if (userType === 'artist') where.artistId = userId;

    return this.prisma.playlist.findMany({
      where,
      include: {
        playlistMusic: {
          include: { music: { include: { artist: true } } },
        },
      },
    });
  }

  async findById(playlistId: string) {
    return this.prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        playlistMusic: {
          include: { music: { include: { artist: true } } },
        },
      },
    });
  }

  async addMusic(playlistId: string, musicId: string, userId: string, userType: string) {
    const where: Record<string, any> = { id: playlistId };
    if (userType === 'user') where.userId = userId;
    else if (userType === 'admin') where.adminId = userId;
    else if (userType === 'superAdmin') where.superAdminId = userId;
    else if (userType === 'artist') where.artistId = userId;

    const playlist = await this.prisma.playlist.findFirst({ where });
    if (!playlist) throw new NotFoundException('Playlist not found or access denied');

    return this.prisma.playlistMusic.create({
      data: { playlistId, musicId },
    });
  }

  async removeMusic(playlistId: string, musicId: string, userId: string, userType: string) {
    const where: Record<string, any> = { id: playlistId };
    if (userType === 'user') where.userId = userId;
    else if (userType === 'admin') where.adminId = userId;
    else if (userType === 'superAdmin') where.superAdminId = userId;
    else if (userType === 'artist') where.artistId = userId;

    const playlist = await this.prisma.playlist.findFirst({ where });
    if (!playlist) throw new NotFoundException('Playlist not found or access denied');

    return this.prisma.playlistMusic.deleteMany({
      where: { playlistId, musicId },
    });
  }

  async deletePlaylist(playlistId: string, userId: string, userType: string) {
    const validUserTypes = ['user', 'admin', 'superAdmin', 'artist'];
    if (!validUserTypes.includes(userType)) {
      throw new Error('Invalid user type');
    }
    
    const where: Record<string, any> = { id: playlistId };
    if (userType === 'user') where.userId = userId;
    else if (userType === 'admin') where.adminId = userId;
    else if (userType === 'superAdmin') where.superAdminId = userId;
    else if (userType === 'artist') where.artistId = userId;

    const playlist = await this.prisma.playlist.findFirst({ where });
    if (!playlist) throw new NotFoundException('Playlist not found or access denied');

    if (!playlistId || typeof playlistId !== 'string') {
      throw new Error('Invalid playlist ID');
    }
    return this.prisma.playlist.delete({ where: { id: playlistId } });
  }
}