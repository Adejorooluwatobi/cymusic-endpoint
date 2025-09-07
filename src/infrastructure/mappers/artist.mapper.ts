import { UserEntity } from '../../domain/entities/user.entity';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import { ArtistProfile } from '../../domain/entities/artist-profile.entity';

export class ArtistMapper {
  static toDomain(prismaArtist: any): UserEntity {
    return new UserEntity({
      id: prismaArtist.id,
      email: prismaArtist.email,
      password: prismaArtist.password ?? undefined,
      displayName: prismaArtist.displayName,
      isActive: prismaArtist.isActive,
      isVerified: prismaArtist.isVerified,
      googleId: prismaArtist.googleId ?? undefined,
      appleId: prismaArtist.appleId ?? undefined,
      createdAt: prismaArtist.createdAt,
      updatedAt: prismaArtist.updatedAt,
      profile: prismaArtist.profile ? this.mapProfile(prismaArtist.profile) : undefined,
      artistProfiles: prismaArtist.artistProfiles ? prismaArtist.artistProfiles.map(this.mapArtistProfile) : undefined
    });
  }

  static toDomainArray(prismaArtists: any[]): UserEntity[] {
    return prismaArtists.map(artist => this.toDomain(artist));
  }

  private static mapProfile(prismaProfile: any): ProfileEntity {
    return new ProfileEntity({
      id: prismaProfile.id,
      phoneNumber: prismaProfile.phoneNumber,
      address: prismaProfile.address,
      city: prismaProfile.city,
      state: prismaProfile.state,
      country: prismaProfile.country,
      postalCode: prismaProfile.postalCode,
      dateOfBirth: prismaProfile.dateOfBirth,
      createdAt: prismaProfile.createdAt,
      updatedAt: prismaProfile.updatedAt,
      userId: prismaProfile.userId ?? undefined,
      adminId: prismaProfile.adminId ?? undefined,
      superAdminId: prismaProfile.superAdminId ?? undefined,
      artistId: prismaProfile.artistId ?? undefined
    });
  }

  private static mapArtistProfile(prismaArtistProfile: any): ArtistProfile {
    return {
      id: prismaArtistProfile.id,
      artistId: prismaArtistProfile.artistId ?? undefined,
      royaltyRate: prismaArtistProfile.royaltyRate ?? undefined,
      activeFollowers: prismaArtistProfile.activeFollowers ?? undefined,
      country: prismaArtistProfile.country ?? undefined,
      bio: prismaArtistProfile.bio ?? undefined,
      profileImageUrl: prismaArtistProfile.profileImageUrl ?? undefined,
      isVerified: prismaArtistProfile.isVerified ?? undefined,
      createdAt: prismaArtistProfile.createdAt,
      updatedAt: prismaArtistProfile.updatedAt
    };
  }

  static toPersistence(userEntity: UserEntity): any {
    return {
      email: userEntity.email,
      password: userEntity.password,
      displayName: userEntity.displayName,
      isActive: userEntity.isActive,
      isVerified: userEntity.isVerified,
      googleId: userEntity.googleId,
      appleId: userEntity.appleId
    };
  }
}