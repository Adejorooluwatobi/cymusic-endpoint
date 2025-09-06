import { UserEntity } from '../../domain/entities/user.entity';
import { ProfileEntity } from '../../domain/entities/profile.entity';

export class AdminMapper {
  static toDomain(prismaAdmin: any): UserEntity {
    return new UserEntity({
      id: prismaAdmin.id,
      email: prismaAdmin.email,
      password: prismaAdmin.password ?? undefined,
      displayName: prismaAdmin.displayName,
      isActive: prismaAdmin.isActive,
      isVerified: prismaAdmin.isVerified,
      createdAt: prismaAdmin.createdAt,
      updatedAt: prismaAdmin.updatedAt,
      profile: prismaAdmin.profile ? this.mapProfile(prismaAdmin.profile) : undefined
    });
  }

  static toDomainArray(prismaAdmins: any[]): UserEntity[] {
    return prismaAdmins.map(admin => this.toDomain(admin));
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

  static toPersistence(userEntity: UserEntity): any {
    return {
      email: userEntity.email,
      password: userEntity.password,
      displayName: userEntity.displayName,
      isActive: userEntity.isActive,
      isVerified: userEntity.isVerified
    };
  }
}