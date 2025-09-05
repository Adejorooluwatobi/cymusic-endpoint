import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ProfileEntity } from '../../../domain/entities/profile.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToUserEntity(user: any): UserEntity {
    return new UserEntity({
      id: user.id,
      email: user.email,
      password: user.password ?? undefined,
      displayName: user.displayName,
      isActive: user.isActive,
      isVerified: user.isVerified,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile ? new ProfileEntity({
        ...user.profile,
        userId: user.profile.userId ?? undefined,
        adminId: user.profile.adminId ?? undefined,
        superAdminId: user.profile.superAdminId ?? undefined,
        artistId: user.profile.artistId ?? undefined
      }) : undefined
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return user ? new UserEntity({
      id: user.id,
      email: user.email,
      password: user.password ?? undefined,
      displayName: user.displayName,
      isActive: user.isActive,
      isVerified: user.isVerified,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile ? new ProfileEntity({
        ...user.profile,
        userId: user.profile.userId ?? undefined,
        adminId: user.profile.adminId ?? undefined,
        superAdminId: user.profile.superAdminId ?? undefined,
        artistId: user.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return user ? new UserEntity({
      id: user.id,
      email: user.email,
      password: user.password ?? undefined,
      displayName: user.displayName,
      isActive: user.isActive,
      isVerified: user.isVerified,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile ? new ProfileEntity({
        ...user.profile,
        userId: user.profile.userId ?? undefined,
        adminId: user.profile.adminId ?? undefined,
        superAdminId: user.profile.superAdminId ?? undefined,
        artistId: user.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: { profile: true }
    });
    return users.map(user => this.mapToUserEntity(user));
  }

  async create(userData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified, googleId, appleId } = userData;
    const user = await this.prisma.user.create({ 
      data: { email, password, displayName, isActive, isVerified, googleId, appleId }
    });
    return new UserEntity({
      id: user.id,
      email: user.email,
      password: user.password ?? undefined,
      displayName: user.displayName,
      isActive: user.isActive,
      isVerified: user.isVerified,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  async update(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified, googleId, appleId } = userData;
    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (googleId !== undefined) updateData.googleId = googleId;
    if (appleId !== undefined) updateData.appleId = appleId;
    
    const user = await this.prisma.user.update({ where: { id }, data: updateData });
    return new UserEntity({
      id: user.id,
      email: user.email,
      password: user.password ?? undefined,
      displayName: user.displayName,
      isActive: user.isActive,
      isVerified: user.isVerified,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}