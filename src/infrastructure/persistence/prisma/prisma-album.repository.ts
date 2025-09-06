import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Album } from '../../../domain/entities/album.entity';
import { CreateAlbumDto } from '../../../application/dto/album/create-album.dto';
import { AlbumMapper } from '../../mappers/album.mapper';

@Injectable()
export class PrismaAlbumRepository {
  constructor(private prisma: PrismaService) {}



  async create(data: CreateAlbumDto & { artistId: string; releaseDate: Date }): Promise<Album> {
    const album = await this.prisma.album.create({
      data: AlbumMapper.toPersistence(data),
      include: {
        albumMusic: {
          include: { music: true },
        },
      },
    });
    return AlbumMapper.toDomain(album);
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
    return album ? AlbumMapper.toDomain(album) : null;
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
    return AlbumMapper.toDomainArray(albums);
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
    return AlbumMapper.toDomainArray(albums);
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