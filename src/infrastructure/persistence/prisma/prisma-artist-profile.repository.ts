import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IArtistProfileRepository } from '../../../domain/repositories/artist-profile.repository.interface';
import { ArtistProfile } from '../../../domain/entities/artist-profile.entity';

@Injectable()
export class PrismaArtistProfileRepository implements IArtistProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

private transformProfile(artistProfile: any): ArtistProfile {
  // Assuming ArtistProfile is an interface/type, not a class with a constructor
  return {
    ...artistProfile,
    artist: artistProfile.artist ? {
      ...artistProfile.artist,
      password: artistProfile.artist.password ?? undefined,
    } : undefined
  };
}

async findById(id: string): Promise<ArtistProfile | null> {
  const artistProfile = await this.prisma.artistProfile.findUnique({
    where: { id },
    include: { artist: true }
  });
  return artistProfile ? this.transformProfile(artistProfile) : null;
}

async findAll(): Promise<ArtistProfile[]> {
  const artistProfiles = await this.prisma.artistProfile.findMany({
    include: { artist: true }
  });
  return artistProfiles.map(profile => this.transformProfile(profile));
}

async create(artistProfileData: any): Promise<ArtistProfile> {
  const {artist: _artist, ...data } = artistProfileData;
  const artistProfile = await this.prisma.artistProfile.create({
    data,
    include: {artist: true}
  });
  return this.transformProfile(artistProfile);
}

async findByArtistId(artistId: string): Promise<ArtistProfile | null> {
  const artistProfile = await this.prisma.artistProfile.findFirst({
    where: {artistId},
    include: {artist: true}
  });
  return artistProfile ? this.transformProfile(artistProfile) : null;
}

async update(id: string, data: Partial<Omit<ArtistProfile, 'artist'>>): Promise<ArtistProfile> {
  const artistProfile = await this.prisma.artistProfile.update({
    where: {id},
    data: data,
    include: {artist: true}
  });
  return this.transformProfile(artistProfile);
}

async delete(id: string): Promise<void> {
  await this.prisma.artistProfile.delete({where: {id}})
}

}
