import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { CreateMusicParams, UpdateMusicParams } from 'src/utils/types';

@Injectable()
export class MusicService {
  constructor(private prisma: PrismaService) {}

  async create(musicDetails: CreateMusicParams) {
    return this.prisma.music.create({
      data: {
        ...musicDetails,
        duration: musicDetails.duration ? String(musicDetails.duration) : undefined, // Ensure duration is a string
      },
      include: { artist: true },
    });
  }

  async findAll() {
    return this.prisma.music.findMany({
      include: { artist: true },
      orderBy: { uploadDate: 'desc' },
    });
  }

  async findByArtist(artistId: string) {
    return this.prisma.music.findMany({
      where: { artistId },
      include: { artist: true },
      orderBy: { uploadDate: 'desc' },
    });
  }

  async findById(id: string) {
    const music = await this.prisma.music.findUnique({
      where: { id },
      include: { artist: true },
    });
    if (!music) throw new NotFoundException('Music not found');
    return music;
  }

  async delete(id: string, artistId: string) {
    const result = await this.prisma.music.deleteMany({
      where: { id, artistId },
    });
    return result.count > 0;
  }

  async update(id: string, artistId: string, musicDetails: UpdateMusicParams) {
    // Prepare update data, omitting artistId to avoid type conflict
    const { artistId: _, audioFileUrl, ...rest } = musicDetails; // Corrected property name
    const updateData: any = {
      ...rest,
    };
    if (audioFileUrl) { // Corrected property name
      updateData.audioFileUrl = audioFileUrl;
    }
    return this.prisma.music.updateMany({
      where: { id, artistId },
      data: updateData,
    });
  }

  async saveToPlaylist(musicId: string, playlistId: string, userId: string) {
    const playlist = await this.prisma.playlist.findFirst({
      where: { id: playlistId, userId },
    });
    if (!playlist) throw new Error('Playlist not found or access denied');

    return this.prisma.playlistMusic.create({
      data: { musicId, playlistId },
    });
  }

  async removeFromPlaylist(musicId: string, playlistId: string, userId: string) {
    const playlist = await this.prisma.playlist.findFirst({
      where: { id: playlistId, userId },
    });
    if (!playlist) throw new Error('Playlist not found or access denied');

    return this.prisma.playlistMusic.deleteMany({
      where: { musicId, playlistId },
    });
  }
}