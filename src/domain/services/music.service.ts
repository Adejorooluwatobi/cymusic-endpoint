import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { CreateMusicParams, UpdateMusicParams } from 'src/utils/types';
import type { IMusicRepository } from '../repositories/music.repository.interface';
import { MusicEntity } from '../entities/music.entity';

@Injectable()
export class MusicService {
  constructor(
    private prisma: PrismaService,
    @Inject('IMusicRepository') private musicRepository: IMusicRepository
  ) {}

  async create(musicDetails: CreateMusicParams) {
    if (!musicDetails.audioFileUrl) {
      throw new NotFoundException('Audio file URL is required');
    }
    
    return this.prisma.music.create({
      data: {
        ...musicDetails,
        audioFileUrl: musicDetails.audioFileUrl,
        duration: musicDetails.duration ? String(musicDetails.duration) : undefined,
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
    const { audioFileUrl, ...rest } = musicDetails; // Corrected property name
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

  async incrementPlayCount(musicId: string): Promise<void> {
    await this.musicRepository.incrementPlayCount(musicId);
  }

  async likeMusic(musicId: string): Promise<void> {
    await this.musicRepository.incrementLikeCount(musicId);
  }

  async shareMusic(musicId: string): Promise<void> {
    await this.musicRepository.incrementShareCount(musicId);
  }

  async getPopularMusic(limit: number = 20): Promise<MusicEntity[]> {
    return this.musicRepository.findPopular(limit);
  }

  async searchMusic(query: string): Promise<MusicEntity[]> {
    return this.musicRepository.search(query);
  }

  async getMusicByGenre(genreId: string): Promise<MusicEntity[]> {
    return this.musicRepository.findByGenre(genreId);
  }
}