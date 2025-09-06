import { UserEntity } from '../../domain/entities/user.entity';
import { ProfileEntity } from '../../domain/entities/profile.entity';

export class SuperAdminMapper {
  static toDomain(prismaSuperAdmin: any): UserEntity {
    return new UserEntity({
      id: prismaSuperAdmin.id,
      email: prismaSuperAdmin.email,
      password: prismaSuperAdmin.password ?? undefined,
      displayName: prismaSuperAdmin.displayName,
      isActive: prismaSuperAdmin.isActive,
      isVerified: prismaSuperAdmin.isVerified,
      createdAt: prismaSuperAdmin.createdAt,
      updatedAt: prismaSuperAdmin.updatedAt,
      profile: prismaSuperAdmin.profile ? this.mapProfile(prismaSuperAdmin.profile) : undefined
    });
  }

  static toDomainArray(prismaSuperAdmins: any[]): UserEntity[] {
    return prismaSuperAdmins.map(superAdmin => this.toDomain(superAdmin));
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