import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ArtistMapper } from '../../mappers/artist.mapper';

@Injectable()
export class PrismaArtistRepository {
  constructor(private readonly prisma: PrismaService) {}



  async findById(id: string): Promise<UserEntity | null> {
    const artist = await this.prisma.artist.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return artist ? ArtistMapper.toDomain(artist) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const artist = await this.prisma.artist.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return artist ? ArtistMapper.toDomain(artist) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const artists = await this.prisma.artist.findMany({
      include: { profile: true }
    });
    return ArtistMapper.toDomainArray(artists);
  }

  async create(artistData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const artist = await this.prisma.artist.create({ 
      data: ArtistMapper.toPersistence(artistData as UserEntity)
    });
    return ArtistMapper.toDomain(artist);
  }

  async update(id: string, artistData: Partial<UserEntity>): Promise<UserEntity> {
    const artist = await this.prisma.artist.update({ 
      where: { id }, 
      data: ArtistMapper.toPersistence(artistData as UserEntity)
    });
    return ArtistMapper.toDomain(artist);
  }

  async delete(id: string): Promise<void> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid artist ID');
    }
    await this.prisma.artist.delete({ where: { id } });
  }
}