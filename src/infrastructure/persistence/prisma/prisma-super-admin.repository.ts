import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ProfileEntity } from '../../../domain/entities/profile.entity';

@Injectable()
export class PrismaSuperAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const superAdmin = await this.prisma.superAdmin.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return superAdmin ? new UserEntity({
      id: superAdmin.id,
      email: superAdmin.email,
      password: superAdmin.password ?? undefined,
      displayName: superAdmin.displayName,
      isActive: superAdmin.isActive,
      isVerified: superAdmin.isVerified,
      createdAt: superAdmin.createdAt,
      updatedAt: superAdmin.updatedAt,
      profile: superAdmin.profile ? new ProfileEntity({
        ...superAdmin.profile,
        userId: superAdmin.profile.userId ?? undefined,
        adminId: superAdmin.profile.adminId ?? undefined,
        superAdminId: superAdmin.profile.superAdminId ?? undefined,
        artistId: superAdmin.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

    async findAll(): Promise<UserEntity[]> {
    const superAdmin = await this.prisma.superAdmin.findMany({
      include: { profile: true }
    });
    return superAdmin.map(user => new UserEntity({
      id: user.id,
      email: user.email,
      password: user.password ?? undefined,
      displayName: user.displayName,
      isActive: user.isActive,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile ? new ProfileEntity({
        ...user.profile,
        userId: user.profile.userId ?? undefined,
        adminId: user.profile.adminId ?? undefined,
        superAdminId: user.profile.superAdminId ?? undefined,
        artistId: user.profile.artistId ?? undefined
      }) : undefined
    }));
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const superAdmin = await this.prisma.superAdmin.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return superAdmin ? new UserEntity({
      id: superAdmin.id,
      email: superAdmin.email,
      password: superAdmin.password ?? undefined,
      displayName: superAdmin.displayName,
      isActive: superAdmin.isActive,
      isVerified: superAdmin.isVerified,
      createdAt: superAdmin.createdAt,
      updatedAt: superAdmin.updatedAt,
      profile: superAdmin.profile ? new ProfileEntity({
        ...superAdmin.profile,
        userId: superAdmin.profile.userId ?? undefined,
        adminId: superAdmin.profile.adminId ?? undefined,
        superAdminId: superAdmin.profile.superAdminId ?? undefined,
        artistId: superAdmin.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }
  

  async create(superAdminData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified } = superAdminData;
    const superAdmin = await this.prisma.superAdmin.create({ 
      data: { email, password, displayName, isActive, isVerified }
    });
    return new UserEntity({
      id: superAdmin.id,
      email: superAdmin.email,
      password: superAdmin.password ?? undefined,
      displayName: superAdmin.displayName,
      isActive: superAdmin.isActive,
      isVerified: superAdmin.isVerified,
      createdAt: superAdmin.createdAt,
      updatedAt: superAdmin.updatedAt
    });
  }

  async update(id: string, superAdminData: Partial<UserEntity>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified } = superAdminData;
    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    
    const superAdmin = await this.prisma.superAdmin.update({ where: { id }, data: updateData });
    return new UserEntity({
      id: superAdmin.id,
      email: superAdmin.email,
      password: superAdmin.password ?? undefined,
      displayName: superAdmin.displayName,
      isActive: superAdmin.isActive,
      isVerified: superAdmin.isVerified,
      createdAt: superAdmin.createdAt,
      updatedAt: superAdmin.updatedAt
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.superAdmin.delete({ where: { id } });
  }
}