import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ProfileEntity } from '../../../domain/entities/profile.entity';

@Injectable()
export class PrismaAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapAdminToUserEntity(admin: any): UserEntity {
    return new UserEntity({
      id: admin.id,
      email: admin.email,
      password: admin.password ?? undefined,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isVerified: admin.isVerified,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      profile: admin.profile ? new ProfileEntity({
        ...admin.profile,
        userId: admin.profile.userId ?? undefined,
        adminId: admin.profile.adminId ?? undefined,
        superAdminId: admin.profile.superAdminId ?? undefined,
        artistId: admin.profile.artistId ?? undefined
      }) : undefined
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const admin = await this.prisma.admin.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return admin ? new UserEntity({
      id: admin.id,
      email: admin.email,
      password: admin.password ?? undefined,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isVerified: admin.isVerified,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      profile: admin.profile ? new ProfileEntity({
        ...admin.profile,
        userId: admin.profile.userId ?? undefined,
        adminId: admin.profile.adminId ?? undefined,
        superAdminId: admin.profile.superAdminId ?? undefined,
        artistId: admin.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const admin = await this.prisma.admin.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return admin ? new UserEntity({
      id: admin.id,
      email: admin.email,
      password: admin.password ?? undefined,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isVerified: admin.isVerified,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      profile: admin.profile ? new ProfileEntity({
        ...admin.profile,
        userId: admin.profile.userId ?? undefined,
        adminId: admin.profile.adminId ?? undefined,
        superAdminId: admin.profile.superAdminId ?? undefined,
        artistId: admin.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

    async findAll(): Promise<UserEntity[]> {
    const admin = await this.prisma.admin.findMany({
      include: { profile: true }
    });
    return admin.map(user => this.mapAdminToUserEntity(user));
  }

  async create(adminData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified } = adminData;
    const admin = await this.prisma.admin.create({ 
      data: { email, password, displayName, isActive, isVerified }
    });
    return new UserEntity({
      id: admin.id,
      email: admin.email,
      password: admin.password ?? undefined,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isVerified: admin.isVerified,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    });
  }

  async update(id: string, adminData: Partial<UserEntity>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified } = adminData;
    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    
    const admin = await this.prisma.admin.update({ where: { id }, data: updateData });
    return new UserEntity({
      id: admin.id,
      email: admin.email,
      password: admin.password ?? undefined,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isVerified: admin.isVerified,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.admin.delete({ where: { id } });
  }
}