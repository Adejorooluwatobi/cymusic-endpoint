import { ArtistProfile } from '../../domain/entities/artist-profile.entity';

export class ArtistProfileMapper {
  static toDomain(prismaArtistProfile: any): ArtistProfile {
    return {
      id: prismaArtistProfile.id,
      artistId: prismaArtistProfile.artistId,
      royaltyRate: prismaArtistProfile.royaltyRate,
      activeFollowers: prismaArtistProfile.activeFollowers,
      country: prismaArtistProfile.country ?? undefined,
      bio: prismaArtistProfile.bio ?? undefined,
      profileImageUrl: prismaArtistProfile.profileImageUrl ?? undefined,
      isVerified: prismaArtistProfile.isVerified,
      createdAt: prismaArtistProfile.createdAt,
      updatedAt: prismaArtistProfile.updatedAt,
      artist: prismaArtistProfile.artist ? {
        ...prismaArtistProfile.artist,
        password: prismaArtistProfile.artist.password ?? undefined,
      } : undefined
    };
  }

  static toDomainArray(prismaArtistProfiles: any[]): ArtistProfile[] {
    return prismaArtistProfiles.map(profile => this.toDomain(profile));
  }

  static toPersistence(artistProfile: Partial<ArtistProfile>): any {
    const { artist, ...data } = artistProfile as any;
    return data;
  }
}