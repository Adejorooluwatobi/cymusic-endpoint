import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Album } from '../../../domain/entities/album.entity';
import { CreateAlbumDto } from '../../../application/dto/album/create-album.dto';

@Injectable()
export class PrismaAlbumRepository {
  constructor(private prisma: PrismaService) {}

  private transformAlbum(album: any): Album {
    return {
      ...album,
      coverImageUrl: album.coverImageUrl || undefined,
    };
  }

  async create(data: CreateAlbumDto & { artistId: string; releaseDate: Date }): Promise<Album> {
    const album = await this.prisma.album.create({
      data,
      include: {
        albumMusic: {
          include: { music: true },
        },
      },
    });
    return this.transformAlbum(album);
  }

  async findById(id: string): Promise<Album | null> {
    const album = await this.prisma.album.findUnique({
      where: { id },
      include: {
        albumMusic: {
          include: { music: true },
        },
      },
    });
    return album ? this.transformAlbum(album) : null;
  }

  async findByArtist(artistId: string): Promise<Album[]> {
    const albums = await this.prisma.album.findMany({
      where: { artistId },
      include: {
        albumMusic: {
          include: { music: true },
        },
      },
      orderBy: { releaseDate: 'desc' },
    });
    return albums.map(album => this.transformAlbum(album));
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany({
      include: {
        albumMusic: {
          include: { music: true },
        },
      },
      orderBy: { releaseDate: 'desc' },
    });
    return albums.map(album => this.transformAlbum(album));
  }

  async addMusic(albumId: string, musicId: string): Promise<void> {
    await this.prisma.albumMusic.create({
      data: { albumId, musicId },
    });
  }

  async removeMusic(albumId: string, musicId: string): Promise<void> {
    await this.prisma.albumMusic.delete({
      where: { albumId_musicId: { albumId, musicId } },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.album.delete({
      where: { id },
    });
  }

  async addMusicToPlaylist(musicId: string, playlistId: string): Promise<void> {
    await this.prisma.playlistMusic.create({
      data: { musicId, playlistId },
    });
  }
}