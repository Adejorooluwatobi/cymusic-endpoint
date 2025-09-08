import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
            throw new ConflictException('Invalid music ID or artist ID');
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
            throw new NotFoundException('Invalid title parameter');
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

    async incrementPlayCount(id: string): Promise<void> {
  await this.prisma.music.update({
    where: { id },
    data: {
      playCount: {
        increment: 1
      }
    }
  });
}

async incrementLikeCount(id: string): Promise<void> {
  await this.prisma.music.update({
    where: { id },
    data: {
      likeCount: {
        increment: 1
      }
    }
  });
}

async incrementShareCount(id: string): Promise<void> {
  await this.prisma.music.update({
    where: { id },
    data: {
      shareCount: {
        increment: 1
      }
    }
  });
}

async findPopular(limit: number = 20): Promise<MusicEntity[]> {
  const musics = await this.prisma.music.findMany({
    take: limit,
    orderBy: [
      { playCount: 'desc' },
      { likeCount: 'desc' }
    ],
    include: { artist: true }
  });
  return MusicMapper.toDomainArray(musics);
}

async search(query: string): Promise<MusicEntity[]> {
  const musics = await this.prisma.music.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { artist: { displayName: { contains: query, mode: 'insensitive' } } }
      ]
    },
    include: { artist: true }
  });
  return MusicMapper.toDomainArray(musics);
}

async findByGenre(genreId: string): Promise<MusicEntity[]> {
  const musics = await this.prisma.music.findMany({
    where: { genreId },
    include: { artist: true }
  });
  return MusicMapper.toDomainArray(musics);
}

async findRecommended(userId: string, limit: number = 20): Promise<MusicEntity[]> {
  // Simple recommendation based on popular music
  // You can implement more sophisticated logic later
  // if (!userId) {
  //   return this.findPopular(limit);
  // } else {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id: userId },
  //     include: { likedMusics: true }
  //   });

  //   if (!user) {
  //     return this.findPopular(limit);
  //   }

  //   const likedMusicIds = user.likedMusics.map(music => music.id);
  //   const recommendedMusics = await this.prisma.music.findMany({
  //     where: {
  //       NOT: { id: { in: likedMusicIds } }
  //     },
  //     take: limit,
  //     orderBy: [
  //       { playCount: 'desc' },
  //       { likeCount: 'desc' }
  //     ],
  //     include: { artist: true }
  //   });

  //   return MusicMapper.toDomainArray(recommendedMusics);
  // } 
  return this.findPopular(limit);
}
}