import { Injectable } from '@nestjs/common';
import { Album } from '../entities/album.entity';
import { PrismaAlbumRepository } from 'src/infrastructure/persistence/prisma/prisma-album.repository';
import { CreateAlbumParams } from 'src/utils/types';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: PrismaAlbumRepository) {}

  async createAlbum(albumDetails: CreateAlbumParams, artistId: string): Promise<Album> {
    const album = await this.albumRepository.create({
      ...albumDetails,
      artistId,
      releaseDate: new Date(),
      title: albumDetails.title, // Map 'name' to 'title' for DTO
    });
    return album;
  }

  async getAlbumById(id: string): Promise<Album | null> {
    return this.albumRepository.findById(id);
  }

  async getAlbumsByArtist(artistId: string): Promise<Album[]> {
    return this.albumRepository.findByArtist(artistId);
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  // async addMusicToAlbum(albumId: string, musicId: string, artistId: string): Promise<void> {
  //   const album = await this.albumRepository.findById(albumId);
  //   if (!album || album.artistId !== artistId) {
  //     throw new Error('Album not found or access denied');
  //   }
  //   await this.albumRepository.addMusic(albumId, musicId);
  // }

  async addMultipleMusicToAlbum(albumId: string, musicIds: string[], artistId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album || album.artistId !== artistId) {
      throw new Error('Album not found or access denied');
    }
    await this.albumRepository.addMultipleMusic(albumId, musicIds);
  }

  async removeMusicFromAlbum(albumId: string, musicId: string, artistId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album || album.artistId !== artistId) {
      throw new Error('Album not found or access denied');
    }
    await this.albumRepository.removeMusic(albumId, musicId);
  }

  async deleteAlbum(id: string, artistId: string): Promise<void> {
    const album = await this.albumRepository.findById(id);
    if (!album || album.artistId !== artistId) {
      throw new Error('Album not found or access denied');
    }
    await this.albumRepository.delete(id);
  }

  async saveAlbumToPlaylist(albumId: string, playlistId: string, _userId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album) throw new Error('Album not found');
    // Add all music from album to playlist
    for (const albumMusic of album.albumMusic || []) {
      try {
        await this.albumRepository.addMusicToPlaylist(albumMusic.musicId, playlistId);
      } catch (_error) {
        // Skip if music already in playlist
      }
    }
  }
}