import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class PrismaArtistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    return artist ? new UserEntity({
      ...artist,
      role: 'ARTIST',
      password: artist.password ?? undefined,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const artist = await this.prisma.artist.findUnique({ where: { email } });
    return artist ? new UserEntity({
      ...artist,
      role: 'ARTIST',
      password: artist.password ?? undefined,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
    }) : null;
  }

  async create(artistData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt' | 'role'>): Promise<UserEntity> {
    const artist = await this.prisma.artist.create({ data: artistData as any });
    return new UserEntity({
      ...artist,
      role: 'ARTIST',
      password: artist.password ?? undefined,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
    });
  }

  async update(id: string, artistData: Partial<UserEntity>): Promise<UserEntity> {
    const artist = await this.prisma.artist.update({ where: { id }, data: artistData as any });
    return new UserEntity({
      ...artist,
      role: 'ARTIST',
      password: artist.password ?? undefined,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.artist.delete({ where: { id } });
  }
}