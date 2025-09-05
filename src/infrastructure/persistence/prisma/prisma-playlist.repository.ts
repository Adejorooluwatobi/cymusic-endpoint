import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {PlaylistEntity } from '../../../domain/entities/playlist.entity';

@Injectable()
export class PrismaPlaylistRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<PlaylistEntity> {
    const playlist = await this.prisma.playlist.create({
      data,
      select: {
        id: true,
        userId: true,
        adminId: true,
        superAdminId: true,
        artistId: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        playlistMusic: { select: { musicId: true, music: true } },
      },
    });
    return {
      id: playlist.id,
      userId: playlist.userId || undefined,
      adminId: playlist.adminId || undefined,
      superAdminId: playlist.superAdminId || undefined,
      artistId: playlist.artistId || undefined,
      name: playlist.name,
      description: playlist.description ?? null,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      playlistMusic: playlist.playlistMusic,
    };
  }

  async findById(id: string): Promise<PlaylistEntity | null> {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        adminId: true,
        superAdminId: true,
        artistId: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        playlistMusic: { select: { musicId: true, music: true } },
      },
    });
    return playlist ? {
      id: playlist.id,
      userId: playlist.userId || undefined,
      adminId: playlist.adminId || undefined,
      superAdminId: playlist.superAdminId || undefined,
      artistId: playlist.artistId || undefined,
      name: playlist.name,
      description: playlist.description ?? null,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      playlistMusic: playlist.playlistMusic,
    } : null;
  }

  async findByUser(userId: string): Promise<PlaylistEntity[]> {
    const playlists = await this.prisma.playlist.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        adminId: true,
        superAdminId: true,
        artistId: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        playlistMusic: { select: { musicId: true, music: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return playlists.map(playlist => ({
      id: playlist.id,
      userId: playlist.userId || undefined,
      adminId: playlist.adminId || undefined,
      superAdminId: playlist.superAdminId || undefined,
      artistId: playlist.artistId || undefined,
      name: playlist.name,
      description: playlist.description ?? null,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      playlistMusic: playlist.playlistMusic,
    }));
  }

  async findAll(): Promise<PlaylistEntity[]> {
    const playlists = await this.prisma.playlist.findMany({
      select: {
        id: true,
        userId: true,
        adminId: true,
        superAdminId: true,
        artistId: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        playlistMusic: { select: { musicId: true, music: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return playlists.map(playlist => ({
      id: playlist.id,
      userId: playlist.userId || undefined,
      adminId: playlist.adminId || undefined,
      superAdminId: playlist.superAdminId || undefined,
      artistId: playlist.artistId || undefined,
      name: playlist.name,
      description: playlist.description ?? null,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      playlistMusic: playlist.playlistMusic,
    }));
  }

  async addMusic(playlistId: string, musicId: string): Promise<void> {
    if (!playlistId || !musicId || typeof playlistId !== 'string' || typeof musicId !== 'string') {
      throw new Error('Valid playlistId and musicId are required');
    }
    await this.prisma.playlistMusic.create({
      data: { playlistId, musicId },
    });
  }

  async removeMusic(playlistId: string, musicId: string): Promise<void> {
    if (!playlistId || !musicId || typeof playlistId !== 'string' || typeof musicId !== 'string') {
      throw new Error('Valid playlistId and musicId are required');
    }
    await this.prisma.playlistMusic.delete({
      where: { playlistId_musicId: { playlistId, musicId } },
    });
  }

  async delete(id: string): Promise<void> {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid id is required');
    }
    await this.prisma.playlist.delete({
      where: { id },
    });
  }

  async addMusicToPlaylist(musicId: string, playlistId: string): Promise<void> {
    if (!musicId || !playlistId || typeof musicId !== 'string' || typeof playlistId !== 'string') {
      throw new Error('Valid musicId and playlistId are required');
    }
    await this.prisma.playlistMusic.create({
      data: { musicId, playlistId },
    });
  }
}