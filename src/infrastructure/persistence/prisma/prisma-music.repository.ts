import { Injectable } from "@nestjs/common";
import { MusicEntity } from "src/domain/entities/music.entity";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaMusicRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToMusicEntity(music: any): MusicEntity {
    return new MusicEntity({
      ...music,
      coverImageUrl: music.coverImageUrl || undefined,
      genre: music.genre || undefined,
      duration: music.duration ? Number(music.duration) : undefined
    });
  }

  async create(data: any): Promise<MusicEntity> {
    const music = await this.prisma.music.create({
      data,
      include: { artist: true }
    });
    return new MusicEntity({
      ...music,
      coverImageUrl: music.coverImageUrl || undefined,
      genre: music.genre || undefined,
      duration: music.duration ? Number(music.duration) : undefined
    });
  }

  async findById(id: string): Promise<MusicEntity | null> {
    const music = await this.prisma.music.findUnique({
      where: { id },
      include: { artist: true }
    });
    return music ? new MusicEntity({
      ...music,
      coverImageUrl: music.coverImageUrl || undefined,
      genre: music.genre || undefined,
      duration: music.duration ? Number(music.duration) : undefined
    }) : null;
  }

  async findAll(): Promise<MusicEntity[]> {
    const musics = await this.prisma.music.findMany({
      include: { artist: true }
    });
    return musics.map(music => new MusicEntity({
      ...music,
      coverImageUrl: music.coverImageUrl || undefined,
      genre: music.genre || undefined,
      duration: music.duration ? Number(music.duration) : undefined
    }));
  }

  async findByArtist(artistId: string): Promise<MusicEntity[]> {
    const musics = await this.prisma.music.findMany({
      where: { artistId },
      include: { artist: true }
    });
    return musics.map(music => new MusicEntity({
      ...music,
      coverImageUrl: music.coverImageUrl || undefined,
      genre: music.genre || undefined,
      duration: music.duration ? Number(music.duration) : undefined
    }));
  }

  async delete(id: string, artistId: string): Promise<MusicEntity | null> {
    const music = await this.prisma.music.findFirst({
      where: { id, artistId },
      include: { artist: true }
    });
    
    if (!music) return null;

    await this.prisma.music.delete({ where: { id } });
    return new MusicEntity({
      ...music,
      coverImageUrl: music.coverImageUrl || undefined,
      genre: music.genre || undefined,
      duration: music.duration ? Number(music.duration) : undefined
    });
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
    
        const { artistId: _, duration, ...updateData } = data;
        const prismaUpdateData = {
          ...updateData,
          ...(duration !== undefined && { duration: String(duration) })
        };
        const updatedMusic = await this.prisma.music.update({
        where: { id },
        data: prismaUpdateData,
        include: { artist: true }
        });
    
        return new MusicEntity({
          ...updatedMusic,
          coverImageUrl: updatedMusic.coverImageUrl || undefined,
          genre: updatedMusic.genre || undefined,
          duration: updatedMusic.duration ? Number(updatedMusic.duration) : undefined
        });
    }

    async findByTitle(title: string): Promise<MusicEntity[]> {
        if (!title || typeof title !== 'string') {
            throw new Error('Invalid title parameter');
        }
        const musics = await this.prisma.music.findMany({
            where: { title: { contains: title, mode: 'insensitive' } },
            include: { artist: true }
        });
        return musics.map(music => new MusicEntity({
          ...music,
          coverImageUrl: music.coverImageUrl || undefined,
          genre: music.genre || undefined,
          duration: music.duration ? Number(music.duration) : undefined
        }));
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