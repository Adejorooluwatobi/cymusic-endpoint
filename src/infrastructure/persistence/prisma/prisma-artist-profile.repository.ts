import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IArtistProfileRepository } from '../../../domain/repositories/artist-profile.repository.interface';
import { ArtistProfile } from '../../../domain/entities/artist-profile.entity';
import { ArtistProfileMapper } from '../../mappers/artist-profile.mapper';

@Injectable()
export class PrismaArtistProfileRepository implements IArtistProfileRepository {
  constructor(private readonly prisma: PrismaService) {}



async findById(id: string): Promise<ArtistProfile | null> {
  const artistProfile = await this.prisma.artistProfile.findUnique({
    where: { id },
    include: { artist: true }
  });
  return artistProfile ? ArtistProfileMapper.toDomain(artistProfile) : null;
}

async findAll(): Promise<ArtistProfile[]> {
  const artistProfiles = await this.prisma.artistProfile.findMany({
    include: { artist: true }
  });
  return ArtistProfileMapper.toDomainArray(artistProfiles);
}

async create(artistProfileData: any): Promise<ArtistProfile> {
  const artistProfile = await this.prisma.artistProfile.create({
    data: ArtistProfileMapper.toPersistence(artistProfileData),
    include: {artist: true}
  });
  return ArtistProfileMapper.toDomain(artistProfile);
}

async findByArtistId(artistId: string): Promise<ArtistProfile | null> {
  const artistProfile = await this.prisma.artistProfile.findFirst({
    where: {artistId},
    include: {artist: true}
  });
  return artistProfile ? ArtistProfileMapper.toDomain(artistProfile) : null;
}

async update(id: string, data: Partial<Omit<ArtistProfile, 'artist'>>): Promise<ArtistProfile> {
  const artistProfile = await this.prisma.artistProfile.update({
    where: {id},
    data: ArtistProfileMapper.toPersistence(data),
    include: {artist: true}
  });
  return ArtistProfileMapper.toDomain(artistProfile);
}

async delete(id: string): Promise<void> {
  await this.prisma.artistProfile.delete({where: {id}})
}

}
