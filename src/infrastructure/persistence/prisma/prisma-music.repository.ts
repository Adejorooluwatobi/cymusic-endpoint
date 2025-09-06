import { Injectable } from "@nestjs/common";
import { MusicEntity } from "src/domain/entities/music.entity";
import { PrismaService } from "./prisma.service";
import { MusicMapper } from '../../mappers/music.mapper';

@Injectable()
export class PrismaMusicRepository {
  constructor(private readonly prisma: PrismaService) {}



  async create(data: any): Promise<MusicEntity> {
    const music = await this.prisma.music.create({
      data: MusicMapper.toPersistence(data),
      include: { artist: true }
    });
    return MusicMapper.toDomain(music);
  }

  async findById(id: string): Promise<MusicEntity | null> {
    const music = await this.prisma.music.findUnique({
      where: { id },
      include: { artist: true }
    });
    return music ? MusicMapper.toDomain(music) : null;
  }

  async findAll(): Promise<MusicEntity[]> {
    const musics = await this.prisma.music.findMany({
      include: { artist: true }
    });
    return MusicMapper.toDomainArray(musics);
  }

  async findByArtist(artistId: string): Promise<MusicEntity[]> {
    const musics = await this.prisma.music.findMany({
      where: { artistId },
      include: { artist: true }
    });
    return MusicMapper.toDomainArray(musics);
  }

  async delete(id: string, artistId: string): Promise<MusicEntity | null> {
    const music = await this.prisma.music.findFirst({
      where: { id, artistId },
      include: { artist: true }
    });
    
    if (!music) return null;

    await this.prisma.music.delete({ where: { id } });
    return MusicMapper.toDomain(music);
  }

    async update(id: string, data: Partial<MusicEntity>, artistId: string): Promise<MusicEntity | null> {
        if (!id || typeof id !== 'string' || !artistId || typeof artistId !== 'string') {
            throw new Error('Invalid music ID or artist ID');
        }
        
        const music = await this.prisma.music.findFirst({
        where: { id, artistId },
        include: { artist: true }
        });
    
        if (!music) return null;
    
        const updatedMusic = await this.prisma.music.update({
        where: { id },
        data: MusicMapper.toPersistence(data),
        include: { artist: true }
        });
    
        return MusicMapper.toDomain(updatedMusic);
    }

    async findByTitle(title: string): Promise<MusicEntity[]> {
        if (!title || typeof title !== 'string') {
            throw new Error('Invalid title parameter');
        }
        const musics = await this.prisma.music.findMany({
            where: { title: { contains: title, mode: 'insensitive' } },
            include: { artist: true }
        });
        return MusicMapper.toDomainArray(musics);
    }

    async addToPlaylist(musicId: string, playlistId: string): Promise<void> {
        await this.prisma.playlistMusic.create({
            data: { musicId, playlistId }
        });
    }

    async removeFromPlaylist(musicId: string, playlistId: string): Promise<void> {
        await this.prisma.playlistMusic.deleteMany({
            where: { musicId, playlistId }
        });
    }
}