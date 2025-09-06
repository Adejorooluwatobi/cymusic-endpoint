import { UserEntity } from '../../domain/entities/user.entity';
import { ProfileEntity } from '../../domain/entities/profile.entity';

export class UserMapper {
  static toDomain(prismaUser: any): UserEntity {
    return new UserEntity({
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password ?? undefined,
      displayName: prismaUser.displayName,
      isActive: prismaUser.isActive,
      isVerified: prismaUser.isVerified,
      googleId: prismaUser.googleId ?? undefined,
      appleId: prismaUser.appleId ?? undefined,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      profile: prismaUser.profile ? this.mapProfile(prismaUser.profile) : undefined
    });
  }

  static toDomainArray(prismaUsers: any[]): UserEntity[] {
    return prismaUsers.map(user => this.toDomain(user));
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
      isVerified: userEntity.isVerified,
      googleId: userEntity.googleId,
      appleId: userEntity.appleId
    };
  }
}