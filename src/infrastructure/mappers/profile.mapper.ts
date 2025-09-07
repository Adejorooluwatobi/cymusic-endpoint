import { ProfileEntity } from '../../domain/entities/profile.entity';

export class ProfileMapper {
  static toDomain(prismaProfile: any): ProfileEntity {
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

  static toDomainArray(prismaProfiles: any[]): ProfileEntity[] {
    return prismaProfiles.map(profile => this.toDomain(profile));
  }

  static toPersistence(profileEntity: Partial<ProfileEntity>): any {
    return {
      phoneNumber: profileEntity.phoneNumber,
      address: profileEntity.address,
      city: profileEntity.city,
      state: profileEntity.state,
      country: profileEntity.country,
      postalCode: profileEntity.postalCode,
      dateOfBirth: profileEntity.dateOfBirth,
      userId: profileEntity.userId,
      adminId: profileEntity.adminId,
      superAdminId: profileEntity.superAdminId,
      artistId: profileEntity.artistId
    };
  }
}